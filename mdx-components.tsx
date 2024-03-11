import { MarkdownHeading } from '@/components/heading';
import type { MDXComponents } from 'mdx/types';

// No idea why I have to put in the root directory for this work.
// Source: https://github.com/vercel/next.js/issues/47523#issuecomment-1558274445

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: MarkdownHeading,
    ...components,
  };
}
