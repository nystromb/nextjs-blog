import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

type SlugEntry = { slug: string; group: string | null };

export type PostGroup = { key: string; label: string; posts: Post[] };

export function getPostSlugs(): SlugEntry[] {
  const entries: SlugEntry[] = [];
  const seen = new Set<string>();

  for (const entry of fs.readdirSync(postsDirectory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      for (const file of fs.readdirSync(join(postsDirectory, entry.name))) {
        if (file.endsWith(".md")) {
          const slug = file.replace(/\.md$/, "");
          if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}" found`);
          seen.add(slug);
          entries.push({ slug, group: entry.name });
        }
      }
    } else if (entry.name.endsWith(".md")) {
      const slug = entry.name.replace(/\.md$/, "");
      if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}" found`);
      seen.add(slug);
      entries.push({ slug, group: null });
    }
  }

  return entries;
}

export function getPostBySlug(slug: string, group: string | null = null): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = group
    ? join(postsDirectory, group, `${realSlug}.md`)
    : join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    group: group ?? undefined,
    content,
    date: data.date instanceof Date ? data.date.toISOString() : data.date,
  } as Post;
}

export function getPostBySlugOnly(slug: string): Post {
  const entry = getPostSlugs().find((e) => e.slug === slug);
  if (!entry) throw new Error(`Post not found: ${slug}`);
  return getPostBySlug(entry.slug, entry.group);
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(({ slug, group }) => getPostBySlug(slug, group))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllPostsGrouped(): PostGroup[] {
  const allPosts = getAllPosts();
  const buckets = new Map<string, Post[]>();

  for (const post of allPosts) {
    const key = post.group ?? "";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(post);
  }

  return Array.from(buckets.entries()).map(([key, posts]) => ({
    key,
    label: key
      ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Other",
    posts,
  }));
}
