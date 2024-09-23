export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'nicholasly.com',
  DESCRIPTION: 'Nicholas Ly is a software engineer and web developer. ',
  EMAIL: 'nick@nicholasly.com',
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://nicholasly.com/',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/nicholasdly', label: 'GitHub' },
  { href: 'https://x.com/nichdly', label: 'Twitter' },
  { href: 'nick@nicholasly.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
