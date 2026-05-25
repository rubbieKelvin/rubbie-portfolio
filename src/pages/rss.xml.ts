import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";

const SITE_URL = "https://rubbietheone.com";

export async function GET() {
  const posts = await getCollection("posts");
  posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  const items: RSSFeedItem[] = posts.map((post) => {
    const mainImageTag = post.data.mainImage
      ? `<img src="${SITE_URL}${post.data.mainImage}" alt="${post.data.title}" />`
      : "";

    return {
      title: post.data.title,
      link: `${SITE_URL}/blog/${post.id.replace(/\.md$/, "")}`,
      pubDate: post.data.publishedAt,
      description: post.data.description || post.body?.substring(0, 200) || "",
      content: `${mainImageTag}\n\n${post.body || ""}`,
      author: "dev.rubbie@gmail.com",
      categories: post.data.categories,
      source: post.data.external_link
        ? {
            url: post.data.external_link,
            title: post.data.title,
          }
        : undefined,
    };
  });

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
        <width>144</width>
        <height>400</height>
        <description>Rubbie Kelvin's blog</description>
      </image>
    `,
  });
}
