import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Hi, I'm Brian Nystrom
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Software Engineer with 10+ years of experience designing and building production-ready software. This site showcases selected projects and work from my career.
      </h4>
    </section>
  );
}
