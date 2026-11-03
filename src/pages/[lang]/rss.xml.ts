import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { languages, type LanguageKey } from "@/i18n/ui";
import { getSlugFromId } from "@/i18n/utils";
import { withBase } from "@/utils/base";
import { postCategories, postsByLang } from "@/utils/posts";

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async (context) => {
  const lang = context.params.lang as LanguageKey;
  const site = context.site?.toString() ?? "http://localhost:4321/";
  const posts = postsByLang(lang);
  const config = await getEntry("config", "site");
  const brand = config?.data.brand;

  const response = await rss({
    title: `${brand?.name ?? "Dax"} Blog`,
    description: brand?.description ?? "Latest posts",
    site,
    items: posts.map((post) => ({
      title: post.data.headline,
      description: post.data.excerpt ?? post.data.subHeadline,
      pubDate: post.data.publishDate,
      link: withBase(`/${lang}/posts/${getSlugFromId(post.id)}/`),
      categories: postCategories(post).filter(
        (category): category is string => typeof category === "string",
      ),
    })),
  });
  const xml = (await response.text()).replace(
    "<channel>",
    '<channel xmlns:atom="http://www.w3.org/2005/Atom"><atom:link href="'
      + new URL(`${lang}/rss.xml`, site).href
      + '" rel="self" type="application/rss+xml" />',
  );
  return new Response(xml, response);
};
