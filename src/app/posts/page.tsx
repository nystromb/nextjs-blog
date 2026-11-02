import { Metadata } from "next";
import Container from "../_components/container";
import Header from "../_components/header";
import { PostPreview } from "../_components/post-preview";
import { getAllPosts } from "../../lib/api";

export default function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          All Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {posts.map((post) => (
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

export const metadata: Metadata = { title: "All Posts" };
