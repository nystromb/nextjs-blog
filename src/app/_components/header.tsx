import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-baseline justify-between mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <Link href="/posts" className="text-lg font-semibold hover:underline">
        All Posts
      </Link>
    </div>
  );
};

export default Header;
