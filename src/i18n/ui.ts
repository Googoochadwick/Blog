// Translation dictionaries and locale metadata for the site.
//
// This follows the official Astro i18n recipe:
// https://docs.astro.build/en/recipes/i18n/
//
// Each language is served from its own subpath (e.g. `/en/`, `/zh-tw/`).
// English is the default language and is fully translated here, so it doubles
// as the source of truth for the set of translation keys.

export const languages = { en: "English" } as const;

export const defaultLang = "en" satisfies keyof typeof languages;

// IETF BCP 47 language tags, used for the <html lang> attribute.
// https://www.w3.org/International/questions/qa-choosing-language-tags
export const languageTags = { en: "en" } as const;

// Compact labels the language picker shows in the narrow top bar, where the
// full names would crowd out the navigation. Keyed like `languages`, so every
// language has to provide one, and kept shorter than the full name.
export const languageShortNames = { en: "EN" } as const;

const en = {
  "nav.home": "Home",
  "nav.posts": "Posts",
  "nav.notes": "Notes",
  "nav.about": "About",
  "home.postsByCategory": "Posts by category",
  "home.more": "… {count} more",
  "posts.title": "Posts",
  "posts.description": "Every post, newest first.",
  "posts.count": "{count} entries",
  "notes.title": "Notes",
  "notes.description": "Quick notes and updates, newest first.",
  "notes.count": "{count} entries",
  "categories.title": "Categories",
  "categories.description": "Posts grouped by category, newest first.",
  "categories.more": "… {count} more",
  "categories.less": "… less",
  "common.back": "[ back ]",
  "common.top": "[ top ]",
  "footer.links": "connect:",
  "language.select": "Please select language",
  "language.unavailable": "Not available in this language",
  "notfound.kicker": "Error 404 · Not in this print run",
  "notfound.title": "That page was never printed.",
  "notfound.body":
    "The document you asked for is not in the archive. It may have moved, been unpublished — or the address may hold a typo.",
  "notfound.pathLabel": "requested",
} as const;

// `satisfies` keeps every language in sync with the English keys: adding a key
// to `en` without translating it elsewhere becomes a type error.
export const ui = { en } satisfies Record<keyof typeof languages, Record<string, string>>;

export type LanguageKey = keyof typeof languages;
export type TranslationKey = keyof typeof en;
