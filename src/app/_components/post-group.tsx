import Link from "next/link";
import { type PostGroup } from "@/lib/api";
import { PostPreview } from "./post-preview";

type Props = { group: PostGroup };

export function PostGroup({ group }: Props) {
  const preview = group.posts.slice(0, 2);

  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {group.label}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-8">
        {preview.map((post) => (
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
      {group.posts.length > 2 && (
        <Link
          href={`/group/${encodeURIComponent(group.key)}`}
          className="text-lg font-semibold hover:underline"
        >
          View all {group.posts.length} posts →
        </Link>
      )}
    </section>
  );
}
