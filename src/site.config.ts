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
    lines: ['Developer based in Braga.', 'My corner for code & side projects.'],
    meta: 'MSc Informatics Engineering @ UMinho · Focused on Cloud, Networking & SRE',
  },

  /** Default meta / Open Graph description. */
  description: 'bleedcode: projects and web apps by a developer based in Braga, Portugal.',
} as const;

export type Site = typeof site;
