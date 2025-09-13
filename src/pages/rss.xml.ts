import rss, { type RSSFeedItem } from "@astrojs/rss";
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
      categories[] -> {
        title
      }
      "short_content": pt::text(body)
      "content": pt::html(body)
    } {
      ...,
      "short_content": string::split(short_content, "")[0..40]
    }{
      ...,
      "short_content": array::join(short_content, "") + "..."
    }`
  );

  let items = posts.map(
    (post): RSSFeedItem => ({
      title: post.title,
      link: `${SITE_URL}/blog/${post.slug.current}`,
      pubDate: post.publishedAt,
      description: post.short_content,
      content: post.content,
      author: "dev.rubbie@gmail.com",
      categories: post.categories.map(
        (category: { title: string }) => category.title
      ),
      source: post.external_link
        ? {
            url: post.external_link,
            title: post.title,
          }
        : undefined,
    })
  );

  return rss({
    title: "Rubbie kelvin",
    description:
      "Thoughts, tutorials, and insights from my development journey—sharing what I learnt along the way.",
    site: SITE_URL,
    items,
    customData: `
      <language>en-us</language>
      <image>
        <url>${SITE_URL}/rto.png</url>
        <title>Rubbie Kelvin</title>
        <link>${SITE_URL}</link>
      </image>
    `,
  });
}
