import { en, type Strings } from './en';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Strings> = { en };

/** Returns the UI strings for a locale. Add `pt` here when the translation exists. */
export function useStrings(locale: Locale = defaultLocale): Strings {
  return dictionaries[locale];
}

/** Formats the build date as dd/mm/yyyy, matching the mockup. */
export function formatDate(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${date.getUTCFullYear()}`;
}
