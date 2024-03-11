import Anchor from "@/components/anchor";
import Heading from "@/components/heading";

export default function WorkPage() {
  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Heading text="my work 👨‍💻" />
      <p>
        I&apos;m on a mission to build aesthetic and simple applications that don&apos;t
        skimp on performance. I strongly believe everyone should enjoy the
        product—users and developers alike.
      </p>
      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <h2 className="font-medium text-xl mb-1">Vervint</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Web Developer</p>
      <p>
        I joined <Anchor href="https://vervint.com/">Vervint</Anchor> directly after
        completing my bachelor&apos;s degree with one goal in mind: learn everything I
        possibly could.
      </p>
      <ul>
        <li>
          In May of 2023, I started as a web development intern working on an
          internal AI chatbot application that utilized Microsoft Azure services
          and OpenAI&apos;s chat completion API.
        </li>
        <li>
          In September of 2023, I would jump at the opportunity to join the web
          development team as a full time employee. Ever since, I&apos;ve been
          developing production-grade, full stack web applications within the
          Microsoft Azure ecosystem with tools such as React, Angular, .NET, SQL,
          and NoSQL databases.
        </li>
      </ul>
      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <h2 className="font-medium text-xl mb-1">NASA - National Aeronautics and Space Administration</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Undergraduate Research Engineer</p>
      <p>
        As an undergraduate student at Michigan State University, I had the
        amazing opportunity to work for a NASA-funded research team known as&nbsp;
        <Anchor href="https://aided-website.vercel.app/">AIDED</Anchor>.
      </p>
      <ul>
        <li>
          In August of 2022, I got word from the group that they&apos;d love to have me
          join their software team. As my first professional development position,
          I made sure to put my best foot forward.
        </li>
        <li>
          By the end of my senior year in May of 2023, I am proud to say I
          developed software that controlled a prototype high payload package
          delivery drone. The drone was capable of autonomously latching onto a
          campus CATA bus to provide a variety of benefits, including improved
          flight efficiency and safety.
        </li>
      </ul>
    </section>
  );
}
