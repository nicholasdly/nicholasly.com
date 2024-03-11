import { ComponentPropsWithoutRef } from "react";

export default function Heading({ text }: { text: string }) {
  return (
    <h1 className="font-medium text-2xl mb-8">
      {text}
    </h1>
  );
}

export function MarkdownHeading(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1 className="font-medium text-2xl mb-8" {...props} />
  );
}
