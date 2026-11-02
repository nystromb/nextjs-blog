import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostGroup } from "@/app/_components/post-group";
import { PostPreview } from "@/app/_components/post-preview";
import { SectionSeparator } from "@/app/_components/section-separator";
import { getAllPosts, getAllPostsGrouped } from "../lib/api";

export default function Index() {
  const latestPosts = getAllPosts().slice(0, 2);
  const latestSlugSet = new Set(latestPosts.map((post) => post.slug));
  const groups = getAllPostsGrouped()
    .map((group) => ({
      ...group,
      posts: group.posts.filter((post) => !latestSlugSet.has(post.slug)),
    }))
    .filter((group) => group.posts.length > 0);

  return (
    <main>
      <Container>
        <Intro />

        {latestPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-8">
              {latestPosts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          </section>
        )}

        {groups.map((group, index) => (
          <div key={group.label}>
            {index > 0 && <SectionSeparator />}
            <PostGroup group={group} />
          </div>
        ))}
      </Container>
    </main>
  );
}
