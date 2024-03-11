import Heading from "@/components/heading";

export default function NotFoundPage() {
  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Heading text="error 404 🫣" />
      <p>
        uh oh! looks like this page doesn&apos;t exist...
      </p>
    </section>
  );
}
