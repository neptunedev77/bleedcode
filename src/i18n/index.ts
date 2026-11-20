import { en, type Strings } from './en';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Strings> = { en };

/** Returns the UI strings for a locale. Add `pt` here when the translation exists. */
export function useStrings(locale: Locale = defaultLocale): Strings {
  return dictionaries[locale];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats a date as "19 Nov 2026" (UTC, so the build machine's timezone doesn't matter). */
export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
