import Title from "@/components/title";

export default function NotFoundPage() {
  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Title title="error 404 🫣" />
      <p>
        uh oh! looks like this page doesn&apos;t exist...
      </p>
    </section>
  );
}
