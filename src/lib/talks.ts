import { getCollection, type CollectionEntry } from "astro:content";

export type Talk = CollectionEntry<"talks">;

/** Published talks, newest first. Drafts are only visible in dev. */
export async function getTalks(): Promise<Talk[]> {
  const talks = await getCollection("talks", ({ data }) => import.meta.env.DEV || !data.draft);
  return talks.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Slides live in src/slides/<talk-slug>/, one .astro file per slide.
 * Files are ordered by name, so prefix them: 01-title.astro, 02-problem.astro, ...
 */
const slideModules = import.meta.glob<{ default: any }>("/src/slides/*/*.astro", {
  eager: true,
});

export function getSlides(slug: string) {
  return Object.entries(slideModules)
    // files starting with "_" are helpers, not slides
    .filter(([path]) => path.split("/").at(-2) === slug && !path.split("/").at(-1)!.startsWith("_"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

export function slidesUrl(talk: Talk): string | null {
  if (talk.data.slides) return talk.data.slides;
  return getSlides(talk.id).length > 0 ? `/talks/${talk.id}/slides` : null;
}

/** Returns the YouTube video id if the cover is a YouTube link, otherwise null. */
export function youtubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const [kind, id] = u.pathname.split("/").filter(Boolean);
      if (["embed", "live", "shorts"].includes(kind)) return id ?? null;
    }
  } catch {}
  return null;
}
