/** English UI strings. A `pt.ts` with the same shape enables `/pt/...` later. */
export const en = {
  nav: {
    label: 'Main',
    projects: 'projects',
    me: '/me',
    github: 'github',
    contact: 'contact',
  },
  home: {
    projects: 'projects',
    viewAll: (n: number) => `view all ${n} →`,
  },
  projects: {
    title: 'projects',
    description: 'Everything built under bleedcode: live apps, work in progress and archived experiments.',
    featured: 'featured',
    more: 'more',
  },
  project: {
    back: '← all projects',
    stack: 'stack',
    links: 'links',
    live: 'live site',
    repo: 'source code',
    screenshots: 'screenshots',
    kind: { personal: 'personal', academic: 'academic' },
  },
  status: { live: 'live', wip: 'wip', archived: 'archived' },
  me: {
    title: '/me',
    description: 'About António Sousa, the person behind bleedcode.',
    bio: 'bio',
    education: 'education',
    focus: 'focus',
    contact: 'contact',
  },
  notFound: {
    title: '404',
    message: 'Nothing here. The cat checked twice.',
    home: '← back home',
  },
  footer: {
    updated: 'updated',
    pt: 'pt',
    theme: 'theme',
    soon: 'coming soon',
  },
  mascot: {
    alt: 'The bleedcode cat, a black cat with a red scarf, sitting on the divider',
  },
} as const;

export type Strings = typeof en;
