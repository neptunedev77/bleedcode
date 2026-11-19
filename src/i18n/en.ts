/** English UI strings. A `pt.ts` with the same shape enables `/pt/...` later. */
export const en = {
  nav: {
    label: 'Main',
    projects: 'projects',
    me: '/me',
    github: 'github',
    contact: 'contact',
    home: 'bleedcode, home',
  },
  home: {
    projects: 'Projects',
    viewAll: (n: number) => `all ${n} →`,
  },
  projects: {
    title: 'Projects',
    description: 'Everything built under bleedcode: live apps and work in progress.',
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
    description: 'About António Sousa, the person behind bleedcode.',
    focus: 'Focus',
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
