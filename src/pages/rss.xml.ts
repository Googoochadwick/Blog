import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { getSlugFromId } from "@/i18n/utils";
import { withBase } from "@/utils/base";
import { postCategories, postsByLang } from "@/utils/posts";

export const GET: APIRoute = async (context) => {
  const lang = "en";
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
      + new URL("rss.xml", site).href
      + '" rel="self" type="application/rss+xml" />',
  );
  return new Response(xml, response);
};
