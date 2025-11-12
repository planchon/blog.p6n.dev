import type { PostProps } from "@lib/types";
import { Feed } from "feed";
import { writeFileSync } from "fs";

export const generateRssFeed = (posts: PostProps[]) => {
  const baseUrl = "https://blog.p6n.dev";
  const author = {
    name: "Paul Planchon",
    email: "paul@p6n.dev",
    link: "https://twitter.com/",
  };

  const feed = new Feed({
    title: "p6n blog",
    description: "engineering notes, thoughts, and ideas",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: "Copyright © 2024 Paul Planchon",
  });

  posts.forEach((post) => {
    const url = `${baseUrl}/p/${post.properties.Slug.rich_text[0].plain_text}`;
    feed.addItem({
      title: post.properties.Page.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      id: url,
      link: url,
      date: new Date(post.properties.Date.date?.start ?? ""),
    });
  });

  writeFileSync("public/rss.xml", feed.rss2());
};
