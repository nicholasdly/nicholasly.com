import { ComponentPropsWithoutRef } from "react";

export function h1(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1 className="font-medium text-2xl mb-8" {...props} />
  );
}

export function h2(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h2 className="font-medium text-xl mb-8" {...props} />
  );
}

export function h3(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h3 className="font-medium text-lg mb-8" {...props} />
  );
}
