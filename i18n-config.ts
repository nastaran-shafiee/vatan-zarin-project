export const i18n = {
  defaultLocale: 'fa',
  locales: ['fa', 'ar', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
