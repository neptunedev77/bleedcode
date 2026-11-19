/**
 * Site-wide settings and placeholders. Edit here, not in components.
 * Translatable UI strings live in `src/i18n/`.
 */
export const site = {
  name: 'bleedcode',
  url: 'https://bleedcode.space',
  author: 'António Sousa',
  email: 'contact@bleedcode.space',
  github: 'https://github.com/neptunedev77',
  githubUser: 'neptunedev77',

  /** Subtitle under the name on the home page. First line is a placeholder. */
  subtitle: ['TODO: title', 'cloud · networking · sre'],

  /** Small captions in the top corners of the card (left, centre, right). */
  captions: {
    left: ['independent', 'web studio'],
    center: ['one app.', 'one subdomain.'],
    right: ['braga,', 'portugal'],
  },

  description:
    'bleedcode is the independent web studio of António Sousa: small, focused web apps, each on its own subdomain.',
} as const;

export type Site = typeof site;
