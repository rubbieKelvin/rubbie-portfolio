import rss from "rss";

const SITE_URL = "https://rubbie.onrender.com";

export default defineEventHandler(async (event) => {
  const blog_post = await queryCollection(event, "blog")
    .order("date", "DESC")
    .all();

  const feed = new rss({
    title: "Rubbie Kelvin",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
  });

  for (const post of blog_post) {
    feed.item({
      title: post.title,
      description: post.description,
      date: post.date,
      url: `${SITE_URL}${post.path}`,
      categories: post.tags ?? [],
      author: "Rubbie kelvin",
    });
  }

  setHeaders(event, { "Content-Type": "application/rss+xml" });
  return feed.xml();
});
