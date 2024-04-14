import Title from "@/components/title";
import { readdir } from "fs/promises";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
};

export function formatDateString(str: string) {
  const date = new Date(str);
  return date.toLocaleDateString('en-US', {dateStyle: 'full', timeZone: 'UTC'});
}

async function getPosts(): Promise<Post[]> {
  const dirents = await readdir("./src/app/blog/(posts)/", { withFileTypes: true });
  const slugs = dirents.filter((dirent) => dirent.isDirectory());

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`../blog/(posts)/${name}/page.mdx`);
      return { slug: name, ...metadata };
    })
  );

  posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Title title="my blog 📝" />
      <ul className="not-prose">
        {posts.map((post) => (
          <li key={post.slug} className="mb-5">
            <Link
              href={`/blog/${post.slug}`}
              className="text-black dark:text-white font-medium"
            >
              {post.title}
            </Link>
            <p className="text-sm mb-1">{formatDateString(post.publishDate)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
