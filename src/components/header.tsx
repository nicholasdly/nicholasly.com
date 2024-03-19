import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-8 mb-16">
        <nav className="flex gap-6">
            <Link
              href="/"
              className="py-1 hover:underline underline-offset-2 decoration-neutral-500"
            >
              home
            </Link>
            <Link
              href="/work"
              className="py-1 hover:underline underline-offset-2 decoration-neutral-500"
            >
              work
            </Link>
            <Link
              href="/projects"
              className="py-1 hover:underline underline-offset-2 decoration-neutral-500"
            >
              projects
            </Link>
            <Link
              href="https://polar.sh/nicholasdly/posts"
              target="_blank"
              rel="noopener"
              className="py-1 hover:underline underline-offset-2 decoration-neutral-500"
            >
              blog
            </Link>
        </nav>
    </header>
  );
}
