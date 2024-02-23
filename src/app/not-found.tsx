import Header from "@/components/header";

export default function NotFound() {
  return (
    <main className="flex flex-col md:max-w-2xl mx-auto mb-40">
      <Header />
      <section className="prose prose-neutral dark:prose-invert text-pretty">
        <h1 className="font-medium text-2xl mb-8">
          error 404 🫣
        </h1>
        <p>
          uh oh! looks like this page doesn&apos;t exist...
        </p>
      </section>
    </main>
  );
}
