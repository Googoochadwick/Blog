import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getSlugFromId } from "@/i18n/utils";
import { withBase } from "@/utils/base";
import { postCategories, postsByLang } from "@/utils/posts";

export const GET: APIRoute = (context) => {
  const lang = "en";
  const site = context.site?.toString() ?? "http://localhost:4321/";
  const posts = postsByLang(lang);

  return rss({
    title: "English posts",
    description: "Latest posts",
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
};
