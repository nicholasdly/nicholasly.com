import Link from "next/link";

interface ExternalProps {
  href: string;
  children: Readonly<React.ReactNode>;
}

export default function External({ href, children }: ExternalProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className="not-prose text-black dark:text-white font-medium underline underline-offset-2 decoration-neutral-500"
    >
      {children}
    </Link>
  );
}