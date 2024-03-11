"use client";

import Title from "@/components/title";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="prose prose-neutral dark:prose-invert text-pretty">
      <Title title="runtime error 😅" />
      <p>
        this is embarrassing... looks like something broke.
      </p>
    </section>
  );
}