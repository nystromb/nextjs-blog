import Link from "next/link";
import { type PostGroup } from "@/lib/api";
import { PostPreview } from "./post-preview";

type Props = { group: PostGroup; totalCount?: number };

export function PostGroup({ group, totalCount = group.posts.length }: Props) {
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
      {totalCount > preview.length && (
        <Link
          href={`/group/${encodeURIComponent(group.key)}`}
          className="text-lg font-semibold hover:underline"
        >
          {group.key === "other"
            ? `See all ${totalCount} other posts →`
            : `See all ${totalCount} posts in ${group.label} →`}
        </Link>
      )}
    </section>
  );
}
