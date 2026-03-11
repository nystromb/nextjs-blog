import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostGroup } from "@/app/_components/post-group";
import { SectionSeparator } from "@/app/_components/section-separator";
import { getAllPostsGrouped } from "../lib/api";

export default function Index() {
  const groups = getAllPostsGrouped();

  return (
    <main>
      <Container>
        <Intro />
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
