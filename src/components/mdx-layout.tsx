export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="prose prose-neutral dark:prose-invert text-pretty">
      {children}
    </article>
  );
}