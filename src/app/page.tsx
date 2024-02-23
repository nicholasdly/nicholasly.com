import Header from "@/components/header";
import Link from "next/link";
import Gallery from "../components/gallery";
import { ArrowIcon } from "../components/icons";
import External from "@/components/external";

export default function Home() {
  return (
    <main className="flex flex-col md:max-w-2xl mx-auto mb-40">
      <Header />
      <section className="prose prose-neutral dark:prose-invert text-pretty">
        <h1 className="font-medium text-2xl mb-8 tracking-tight">
          hey, I&apos;m nick 👋
        </h1>
        <p>
          I&apos;m a software engineer both by profession and by hobby. I currently work
          as a Web Developer at <External href="https://vervint.com/">Vervint</External>,
          where I&apos;ve been building production-grade web applications and APIs for a
          variety of great clients.
        </p>
        <Gallery />
        <p>
          I work on a variety of open-source projects outside of my usual work
          hours, and I especially love to build with modern and cutting edge tools.
          I love the learning process, and I&apos;m passionate about sharing everything I
          know.
        </p>
        <div className="my-8 flex flex-col sm:flex-row gap-2 sm:gap-8 not-prose">
          <Link
            href="https://www.linkedin.com/in/nicholasdly/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-0.5 text-black dark:text-white font-medium group"
          >
            <ArrowIcon />
            <span className="group-hover:underline underline-offset-2 decoration-neutral-500">
              connect with me on linkedin
            </span>
          </Link>
          <Link
            href="https://github.com/nicholasdly"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-0.5 text-black dark:text-white font-medium group"
          >
            <ArrowIcon />
            <span className="group-hover:underline underline-offset-2 decoration-neutral-500">
              follow me on github
            </span>
          </Link>
        </div>
        <p>
          I enjoy sponsoring undergraduate organizations filled with passionate young
          developers, and happily advise students of all ages.
        </p>
      </section>
    </main>
  );
}
