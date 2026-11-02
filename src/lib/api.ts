import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const DEFAULT_COVER_IMAGE = "/assets/blog/preview/cover.jpg";
const DEFAULT_AUTHOR = {
  name: "Brian Nystrom",
  picture: "/assets/blog/authors/brian.jpeg",
};

type SlugEntry = { slug: string; group: string | null };

export type PostGroup = { key: string; label: string; posts: Post[] };

function normalizeGroupKey(group: string | null | undefined): string {
  return group && group.trim() ? group : "other";
}

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
  const resolvedGroup = normalizeGroupKey(group);
  const fullPath = group
    ? join(postsDirectory, group, `${realSlug}.md`)
    : join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    group: resolvedGroup,
    groupRank:
      typeof data.groupRank === "number" ? data.groupRank : undefined,
    title: data.title ?? realSlug,
    coverImage: data.coverImage ?? DEFAULT_COVER_IMAGE,
    author: data.author ?? DEFAULT_AUTHOR,
    excerpt: data.excerpt ?? "",
    ogImage: { url: data.ogImage?.url ?? DEFAULT_COVER_IMAGE },
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
    const key = normalizeGroupKey(post.group);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(post);
  }

  return Array.from(buckets.entries())
    .map(([key, posts]) => ({
      key,
      label:
        key === "other"
          ? "See more"
          : key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      posts,
      groupRank: posts.reduce((rank, post) => {
        if (key === "other") return Number.MAX_SAFE_INTEGER;
        if (typeof post.groupRank === "number") {
          return Math.min(rank, post.groupRank);
        }
        return rank;
      }, key === "other" ? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER / 2),
    }))
    .sort((a, b) => {
      if (a.groupRank !== b.groupRank) return a.groupRank - b.groupRank;
      return a.label.localeCompare(b.label);
    })
    .map(({ groupRank, ...group }) => group);
}
