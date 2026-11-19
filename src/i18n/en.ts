/** English UI strings. A `pt.ts` with the same shape enables `/pt/...` later. */
export const en = {
  nav: {
    label: 'Main',
    home: '/home',
    projects: '/projects',
    me: '/me',
    logo: 'bleedcode, home',
    github: 'GitHub profile',
    contact: 'Send an email',
  },
  home: {
    projects: 'Projects',
    viewAll: 'all projects →',
  },
  projects: {
    title: 'Projects',
    description: 'Everything built under bleedcode: live apps and work in progress.',
    openLive: (name: string) => `Visit ${name} (opens in a new tab)`,
  },
  project: {
    back: '← all projects',
    stack: 'Stack',
    links: 'Links',
    live: 'live site',
    repo: 'source',
    screenshots: 'Screenshots',
    kind: { personal: 'personal project', academic: 'academic project' },
  },
  status: { live: 'live', wip: 'wip', archived: 'archived' },
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
  },
  notFound: {
    title: '404',
    message: 'Nothing here. The cat checked twice.',
    home: '← back home',
  },
  footer: {
    updated: 'updated',
  },
  mascot: {
    alt: 'The bleedcode cat: a black pixel-art cat with a red scarf',
  },
} as const;

export type Strings = typeof en;
