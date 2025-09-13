import rss from "@astrojs/rss";
import { sanityClient } from "sanity:client";
import type { SanityDocument } from "@sanity/client";

const SITE_URL = "https://rubbietheone.com";

export async function GET() {
  const posts = await sanityClient.fetch<SanityDocument[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      external_link,
      "short_content": pt::text(body)
    } {
      ...,
      "short_content": string::split(short_content, "")[0..40]
    }{
      ...,
      "short_content": array::join(short_content, "") + "..."
    }`
  );

  return rss({
    title: "Rubbie kelvin",
    description:
      "Thoughts, tutorials, and insights from my development journey—sharing what I learnt along the way.",
    site: SITE_URL,
    items: posts.map((post) => ({
      title: post.title,
      link: `${SITE_URL}/blog/${post.slug.current}`,
      pubDate: post.publishedAt,
      description: post.short_content,
      content: post.short_content,
    })),
    customData: `<language>en-us</language>`,
  });
}
