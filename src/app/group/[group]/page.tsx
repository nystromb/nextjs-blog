import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PostPreview } from "../../_components/post-preview";
import { getAllPostsGrouped } from "../../../lib/api";

type Params = { params: { group: string } };

function getGroup(slug: string) {
  return getAllPostsGrouped().find((g) => g.key === decodeURIComponent(slug));
}

export default function GroupPage({ params }: Params) {
  const group = getGroup(params.group);
  if (!group) return notFound();

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          {group.label}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {group.posts.map((post) => (
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
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const group = getGroup(params.group);
  if (!group) return {};
  return { title: group.label };
}

export function generateStaticParams() {
  return getAllPostsGrouped().map((g) => ({ group: g.key }));
}
