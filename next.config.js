const { remarkCodeHike } = require("@code-hike/mdx");
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [
      [remarkCodeHike, {
        showCopyButton: true,
        theme: "github-from-css",
      }],
    ],
  },
});
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}
 
module.exports = withMDX(nextConfig);
