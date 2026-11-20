/** English UI strings. A `pt.ts` with the same shape enables `/pt/...` later. */
export const en = {
  nav: {
    label: 'Main',
    home: '/home',
    projects: '/projects',
    me: '/me',
    logo: 'bleedcode, home',
    github: 'GitHub profile',
    contact: 'Copy email address to clipboard',
  },
  home: {
    title: 'solo developer lab in Braga',
    projects: 'Projects',
    explore: 'explore all',
  },
  filters: {
    legend: 'Filter projects by status',
    all: 'all',
  },
  projects: {
    title: 'Projects',
    tabTitle: '/projects',
    empty: 'nothing here yet',
    description: 'Everything built under bleedcode: live apps and work in progress.',
    openLive: (name: string) => `Visit ${name} (opens in a new tab)`,
    openRepo: (name: string) => `Source code of ${name} on GitHub (opens in a new tab)`,
  },
  project: {
    back: '← all projects',
    stack: 'Stack',
    links: 'Links',
    live: 'live site',
    repo: 'source',
    features: 'Features',
    screenshots: 'Screenshots',
    noScreenshots: 'no screenshots yet',
    kind: { personal: 'personal project', academic: 'academic project' },
  },
  status: { live: 'live', done: 'done', wip: 'wip' },
  me: {
    title: '/me',
    description: 'About the developer behind bleedcode: background, education and interests.',
    education: 'Education',
    present: 'present',
    now: 'now',
    interests: 'Interests',
    focus: 'at the keyboard',
    offline: 'away from it',
    contact: 'Contact',
    localTitle: 'Locally titled as Informatics Engineering',
  },
  notFound: {
    title: '404',
    message: 'Nothing here. The cat checked twice.',
    home: '← back home',
  },
  footer: {
    updated: 'last updated',
  },
  copy: {
    label: 'copy to clipboard',
    done: 'copied to clipboard ✓',
  },
  mascot: {
    alt: 'The bleedcode cat: a black pixel-art cat with a red scarf',
  },
} as const;

export type Strings = typeof en;
