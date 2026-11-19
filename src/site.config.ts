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

  /** Hero line on the home page. */
  tagline: 'Developer based in Braga, Portugal.',

  /** Default meta / Open Graph description. */
  description: 'bleedcode: projects and web apps by a developer based in Braga, Portugal.',
} as const;

export type Site = typeof site;
