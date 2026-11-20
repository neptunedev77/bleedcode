/**
 * Site-wide settings. Edit here, not in components.
 * Translatable UI strings live in `src/i18n/`.
 */
export const site = {
  name: 'bleedcode',
  url: 'https://bleedcode.space',
  email: 'contact@bleedcode.space',
  github: 'https://github.com/neptunedev77',
  githubUser: 'neptunedev77',

  /** Home hero: two headline lines and a short meta line. */
  hero: {
    lines: ['Solo developer lab in Braga.', 'My corner for code & side projects.'],
    meta: 'Focused on Cloud, Networking, SRE & Web Tools',
  },

  /** Default meta / Open Graph description. */
  description: 'bleedcode: a solo developer lab in Braga, Portugal. Web apps, tools and side projects.',
} as const;

export type Site = typeof site;
