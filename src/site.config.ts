/**
 * Site-wide settings. Edit here, not in components.
 * Translatable UI strings live in `src/i18n/`.
 */
export const site = {
  name: 'bleedcode',
  url: 'https://bleedcode.space',
  author: 'António Sousa',
  location: 'Braga, Portugal',
  email: 'contact@bleedcode.space',
  github: 'https://github.com/neptunedev77',
  githubUser: 'neptunedev77',

  /** One-sentence introduction under the wordmark (also the default meta description). */
  intro: "I'm António Sousa. I build small web apps in Braga, Portugal, and give each one its own subdomain.",

  /** Areas of interest shown on /me. */
  focus: ['cloud', 'networking', 'sre'],
} as const;

export type Site = typeof site;
