import dayjs from "dayjs";
import type React from "react";
import { useMemo } from "react";
import type { PostProps } from "../lib/types";
import { cn } from "../utils";
import { Divider } from "./Divider";
import Link from "./Link";
import { NotionText } from "./NotionText";
import { PostCategory } from "./PostCategory";

export const ContinueReading: React.FC<{
  posts: PostProps[];
  category: string;
}> = ({ posts, category }) => {
  category = category === "Guide" ? "Guides" : category;

  return (
    <div>
      <header className={cn("mb-8 flex items-center justify-between")}>
        <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-lg">
          Continue Reading...
        </h3>
        <Link
          className={cn("text-pink-500", "hover:underline")}
          href={`/${category.toLowerCase()}`}
        >
          View All {category} →
        </Link>
      </header>

      <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-2")}>
        {posts.map((post) => (
          <RelatedPostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const RelatedPostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date?.start ?? "")).format(
        "MMM D, YYYY"
      ),
    [post.properties.Date.date?.start]
  );

  const author = post.properties.Authors.people[0];
  const category = post.properties.Category.select?.name;

  return (
    <Link
      className="group flex flex-col rounded-lg bg-secondaryBg p-6 hover:bg-gray-100 dark:hover:bg-gray-800"
      href={`/p/${post.properties.Slug.rich_text[0].plain_text}`}
    >
      {category != null && <PostCategory category={category} />}

      <div className="flex-grow">
        <header className="mt-2 mb-1 font-bold text-lg">
          <NotionText noLinks text={post.properties.Page.title} />
        </header>

        <p className="line-clamp-2 text-base text-gray-800 dark:text-gray-200">
          <NotionText noLinks text={post.properties.Description.rich_text} />
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <img
          alt={`Avatar of ${author.name}`}
          className="h-6 w-6 overflow-hidden rounded-full"
          src={author.avatar_url}
        />
        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">{author.name}</span>
        <Divider />
        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">
          {formattedDate}
        </span>
      </div>
    </Link>
  );
};
