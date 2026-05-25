import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PROJECT_ID = "16odtdyl";
const DATASET = "production";
const IMAGE_CDN = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}`;

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
});

const IMAGES_DIR = path.join(PROJECT_ROOT, "public", "images");
const CONTENT_DIR = path.join(PROJECT_ROOT, "src", "content");
const DATA_DIR = path.join(PROJECT_ROOT, "src", "data");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseImageRef(ref) {
  if (!ref) return null;
  const stripped = ref.replace(/^image-/, "");
  const parts = stripped.split("-");
  const format = parts.pop();
  const id = parts.join("-");
  return { id, format, ref };
}

function imageCdnUrl(imageRef, width, height) {
  const parsed = parseImageRef(imageRef);
  if (!parsed) return null;
  let url = `${IMAGE_CDN}/${parsed.id}.${parsed.format}`;
  const params = [];
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (params.length) url += `?${params.join("&")}`;
  return url;
}

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadFile(res.headers.location, filepath)
            .then(resolve)
            .catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          console.error(`  FAILED ${url} → ${res.statusCode}`);
          resolve(null);
          return;
        }
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(filepath);
        });
        file.on("error", (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      })
      .on("error", reject);
  });
}

function ptToMarkdown(body, imageMap) {
  if (!body || !Array.isArray(body)) return "";

  return body
    .map((block) => {
      if (block._type === "code") {
        const lang = block.language || "";
        return "```" + lang + "\n" + (block.code || "") + "\n```";
      }

      if (block._type === "image") {
        const alt = block.alt || "";
        const localPath = imageMap?.get(block.asset?._ref) || "";
        return localPath ? `![${alt}](${localPath})` : `![${alt}]()`;
      }

      if (block._type === "block") {
        return blockToMd(block);
      }

      return "";
    })
    .join("\n\n");
}

function blockToMd(block) {
  const style = block.style || "normal";
  const listItem = block.listItem;
  const level = block.level || 1;
  const text = inlineToMd(block.children, block.markDefs);

  if (listItem === "bullet") {
    const indent = "  ".repeat(Math.max(0, level - 1));
    return `${indent}- ${text}`;
  }
  if (listItem === "number") {
    const indent = "  ".repeat(Math.max(0, level - 1));
    return `${indent}1. ${text}`;
  }

  switch (style) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "blockquote":
      return `> ${text}`;
    default:
      return text;
  }
}

function inlineToMd(children, markDefs) {
  if (!children || !Array.isArray(children)) return "";

  let result = "";
  for (const child of children) {
    if (child._type !== "span") {
      result += child.text || "";
      continue;
    }
    let text = child.text || "";
    const marks = child.marks || [];

    for (const mark of marks) {
      const def = markDefs?.find((d) => d._key === mark);
      if (def && def._type === "link") {
        text = `[${text}](${def.href})`;
      } else {
        switch (mark) {
          case "strong":
            text = `**${text}**`;
            break;
          case "em":
            text = `*${text}*`;
            break;
          case "code":
            text = "`" + text + "`";
            break;
        }
      }
    }
    result += text;
  }
  return result;
}

function ptToHtml(body, imageMap) {
  if (!body || !Array.isArray(body)) return "";

  return body
    .map((block) => {
      if (block._type === "code") {
        const lang = block.language || "";
        return `<pre><code class="language-${lang}">${escapeHtml(block.code || "")}</code></pre>`;
      }
      if (block._type === "image") {
        const alt = block.alt || "";
        const localPath = imageMap?.get(block.asset?._ref) || "";
        return localPath
          ? `<img src="${localPath}" alt="${escapeHtml(alt)}" class="w-full h-auto" />`
          : `<img alt="${escapeHtml(alt)}" />`;
      }
      if (block._type === "block") {
        return blockToHtml(block);
      }
      return "";
    })
    .join("\n");
}

function blockToHtml(block) {
  const style = block.style || "normal";
  const listItem = block.listItem;
  const text = inlineToHtml(block.children, block.markDefs);

  if (listItem === "bullet") return `<ul><li>${text}</li></ul>`;
  if (listItem === "number") return `<ol><li>${text}</li></ol>`;

  switch (style) {
    case "h1":
      return `<h1>${text}</h1>`;
    case "h2":
      return `<h2>${text}</h2>`;
    case "h3":
      return `<h3>${text}</h3>`;
    case "h4":
      return `<h4>${text}</h4>`;
    case "blockquote":
      return `<blockquote>${text}</blockquote>`;
    default:
      return `<p>${text}</p>`;
  }
}

function inlineToHtml(children, markDefs) {
  if (!children || !Array.isArray(children)) return "";
  let result = "";
  for (const child of children) {
    if (child._type !== "span") {
      result += escapeHtml(child.text || "");
      continue;
    }
    let text = escapeHtml(child.text || "");
    const marks = child.marks || [];
    for (const mark of marks) {
      const def = markDefs?.find((d) => d._key === mark);
      if (def && def._type === "link") {
        text = `<a href="${escapeHtml(def.href)}">${text}</a>`;
      } else {
        switch (mark) {
          case "strong":
            text = `<strong>${text}</strong>`;
            break;
          case "em":
            text = `<em>${text}</em>`;
            break;
          case "code":
            text = `<code>${text}</code>`;
            break;
        }
      }
    }
    result += text;
  }
  return result;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function collectImageRefs(docs) {
  const refs = new Set();

  for (const doc of docs) {
    if (doc.mainImage?.asset?._ref) refs.add(doc.mainImage.asset._ref);
    if (doc.image?.asset?._ref) refs.add(doc.image.asset._ref);

    if (doc.body && Array.isArray(doc.body)) {
      for (const block of doc.body) {
        if (block._type === "image" && block.asset?._ref) {
          refs.add(block.asset._ref);
        }
      }
    }

    if (doc.projects && Array.isArray(doc.projects)) {
      for (const p of doc.projects) {
        if (p.mainImage?.asset?._ref) refs.add(p.mainImage.asset._ref);
      }
    }
  }

  return [...refs];
}

async function downloadImages(imageRefs) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const imageMap = new Map();

  console.log(`\nDownloading ${imageRefs.length} images...`);
  let count = 0;

  for (const ref of imageRefs) {
    const parsed = parseImageRef(ref);
    if (!parsed) continue;

    const filename = `${parsed.id}.${parsed.format}`;
    const filepath = path.join(IMAGES_DIR, filename);
    const publicPath = `/images/${filename}`;

    if (fs.existsSync(filepath)) {
      imageMap.set(ref, publicPath);
      count++;
      continue;
    }

    const url = imageCdnUrl(ref);
    try {
      await downloadFile(url, filepath);
      imageMap.set(ref, publicPath);
      count++;
      if (count % 5 === 0) console.log(`  ${count}/${imageRefs.length}`);
    } catch (e) {
      console.error(`  Failed: ${url} → ${e.message}`);
    }
  }

  console.log(`  Done: ${count}/${imageRefs.length} images downloaded`);
  return imageMap;
}

function yamlEscape(str) {
  if (typeof str !== "string") return str;
  if (/[:\n"'#{}\[\],&*!|>%@`]/.test(str) || str.includes("  ")) {
    return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return str;
}

function toFrontmatter(obj) {
  let yaml = "---\n";
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (key === "body") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) {
        yaml += `${key}: []\n`;
      } else {
        yaml += `${key}:\n`;
        for (const item of value) {
          yaml += `  - ${yamlEscape(item)}\n`;
        }
      }
    } else if (typeof value === "object" && value instanceof Date) {
      yaml += `${key}: ${value.toISOString().split("T")[0]}\n`;
    } else {
      yaml += `${key}: ${yamlEscape(value)}\n`;
    }
  }
  yaml += "---\n";
  return yaml;
}

async function main() {
  console.log("Fetching all documents from Sanity...");

  const [introDocs, posts, authors, categories, projects, links] =
    await Promise.all([
      client.fetch(
        `*[_type == "intro" && active == true][0] { _id, title, subtitle, description, action_text, action_link->{url} }`,
      ),
      client.fetch(
        `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, body, mainImage, publishedAt, external_link, description, author->{_id,name,image,"slug":slug.current}, categories[]->{_id,title} }`,
      ),
      client.fetch(
        `*[_type == "author"] { _id, name, slug, image, bio, links[]->{title,url} }`,
      ),
      client.fetch(
        `*[_type == "category"] { _id, title, is_project_category }`,
      ),
      client.fetch(
        `*[_type == "project"] { _id, title, slug, description, mainImage, url, categories[]->{_id,title} }`,
      ),
      client.fetch(
        `*[_type == "link" && featured_contact_link == true] { _id, title, slug, url }`,
      ),
    ]);

  console.log(
    `Fetched: ${posts.length} posts, ${authors.length} authors, ${categories.length} categories, ${projects.length} projects, ${links.length} contact links`,
  );

  const allDocs = [...posts, ...authors, ...projects, ...categories];
  const imageRefs = collectImageRefs(allDocs);
  if (introDocs) {
    imageRefs.push(...collectImageRefs([introDocs]));
  }

  const imageMap = await downloadImages(imageRefs);

  console.log("\nWriting categories...");
  const categorySlugMap = new Map();
  const categoriesDir = path.join(CONTENT_DIR, "categories");
  fs.mkdirSync(categoriesDir, { recursive: true });

  for (const cat of categories) {
    const catSlug = slugify(cat.title);
    categorySlugMap.set(cat._id, catSlug);
    const catData = {
      title: cat.title,
      is_project_category: cat.is_project_category || false,
    };
    fs.writeFileSync(
      path.join(categoriesDir, `${catSlug}.json`),
      JSON.stringify(catData, null, 2),
    );
  }
  console.log(`  ${categories.length} categories written`);

  console.log("Writing projects...");
  const projectsDir = path.join(CONTENT_DIR, "projects");
  fs.mkdirSync(projectsDir, { recursive: true });

  for (const proj of projects) {
    const projSlug = slugify(proj.title);
    const catSlugs = (proj.categories || [])
      .map((c) => categorySlugMap.get(c._id))
      .filter(Boolean);
    const projData = {
      title: proj.title,
      description: proj.description || "",
      url: proj.url || "",
      mainImage: proj.mainImage?.asset?._ref
        ? imageMap.get(proj.mainImage.asset._ref)
        : null,
      categories: catSlugs,
    };
    fs.writeFileSync(
      path.join(projectsDir, `${projSlug}.json`),
      JSON.stringify(projData, null, 2),
    );
  }
  console.log(`  ${projects.length} projects written`);

  console.log("Writing authors...");
  const authorSlugMap = new Map();
  const authorsDir = path.join(CONTENT_DIR, "authors");
  fs.mkdirSync(authorsDir, { recursive: true });

  for (const author of authors) {
    const authorSlug =
      (author.slug && author.slug.current) || slugify(author.name);
    authorSlugMap.set(author._id, authorSlug);

    const authorData = {
      name: author.name,
      slug: authorSlug,
      image: author.image?.asset?._ref
        ? imageMap.get(author.image.asset._ref)
        : null,
      bio: ptToHtml(author.bio, imageMap),
      links: (author.links || []).map((l) => ({
        title: l.title,
        url: l.url,
      })),
    };

    fs.writeFileSync(
      path.join(authorsDir, `${authorSlug}.json`),
      JSON.stringify(authorData, null, 2),
    );
  }
  console.log(`  ${authors.length} authors written`);

  console.log("Writing posts...");
  const postsDir = path.join(CONTENT_DIR, "posts");
  fs.mkdirSync(postsDir, { recursive: true });

  for (const post of posts) {
    const postSlug = post.slug?.current || slugify(post.title);
    const authorSlug = post.author
      ? authorSlugMap.get(post.author._id) || slugify(post.author.name)
      : null;
    const catSlugs = (post.categories || [])
      .map((c) => categorySlugMap.get(c._id))
      .filter(Boolean);

    const frontmatter = {
      title: post.title,
      publishedAt: new Date(post.publishedAt),
      description: post.description || "",
      author: authorSlug,
      categories: catSlugs,
      mainImage: post.mainImage?.asset?._ref
        ? imageMap.get(post.mainImage.asset._ref)
        : null,
      external_link: post.external_link || undefined,
    };

    const bodyMd = ptToMarkdown(post.body, imageMap);
    const content = toFrontmatter(frontmatter) + "\n" + bodyMd + "\n";

    const filename = postSlug + ".md";
    fs.writeFileSync(path.join(postsDir, filename), content);
  }
  console.log(`  ${posts.length} posts written`);

  console.log("Writing intro...");
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (introDocs) {
    const introData = {
      title: introDocs.title || "",
      subtitle: introDocs.subtitle || "",
      description: ptToHtml(introDocs.description, imageMap),
      action_text: introDocs.action_text || "",
      action_url: introDocs.action_link?.url || "",
    };
    fs.writeFileSync(
      path.join(DATA_DIR, "intro.json"),
      JSON.stringify(introData, null, 2),
    );
  }

  console.log("Writing contact links...");
  const linksData = links.map((l) => ({
    title: l.title,
    url: l.url,
  }));
  fs.writeFileSync(
    path.join(DATA_DIR, "links.json"),
    JSON.stringify(linksData, null, 2),
  );
  console.log(`  ${links.length} links written`);

  console.log("\n Export complete!");
}

main().catch(console.error);
