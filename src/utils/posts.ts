import { getCollection } from "astro:content";
import type { LanguageKey } from "@/i18n/ui";
import { getLangFromId } from "@/i18n/utils";

const isProduction = import.meta.env.MODE === "production";

export const publishedPosts = await getCollection(
  "post",
  (post) => !isProduction || !post.data.isDraft,
);

export const dateSortedPublishedPosts = [...publishedPosts].sort(
  (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
);

/** Published posts written in the given language, newest first. */
export const postsByLang = (lang: LanguageKey) =>
  dateSortedPublishedPosts.filter((post) => getLangFromId(post.id) === lang);

/** Categories assigned to a post, normalized for both legacy strings and lists. */
export const postCategories = (post: (typeof publishedPosts)[number]) =>
  [...new Set(Array.isArray(post.data.category) ? post.data.category : [post.data.category])];

/** The categories that have posts in the given language, alphabetically. */
export const categoriesByLang = (lang: LanguageKey) =>
  [
    ...new Set(
      postsByLang(lang).flatMap((post) => postCategories(post)),
    ),
  ].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

/** The given language's posts grouped by their category. */
export const postsByCategoryForLang = (lang: LanguageKey) =>
  categoriesByLang(lang).map((category) => ({
    category,
    posts: postsByLang(lang).filter((post) => postCategories(post).includes(category)),
  }));
