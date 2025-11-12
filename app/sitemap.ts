import { getDatabase } from "@lib/notion";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.POSTS_TABLE_ID) {
    return [];
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID);

  return [
    {
      url: "https://p6n.blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `https://p6n.blog/p/${post.properties.Slug.rich_text[0].plain_text}`,
      lastModified: new Date(post.properties.Date.date?.start ?? ""),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
