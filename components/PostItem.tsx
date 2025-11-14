import Link from "@components/Link";
import { imageProxy } from "@lib/notion/image";
import type { PostProps } from "@lib/types";
import dayjs from "dayjs";
import Image from "next/image";
import type React from "react";
import { useMemo } from "react";
import { Divider } from "./Divider";
import { NotionText } from "./NotionText";
import { PostCategory } from "./PostCategory";

export type Props = {
  post: PostProps;
};

const PostItem: React.FC<Props> = async ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date?.start ?? "")).format(
        "MMM D, YYYY"
      ),
    [post.properties.Date.date?.start]
  );

  const author = post.properties.Authors.people[0];
  const authorExists = author != null && author.name != null;
  const category = post.properties.Category.select?.name;

  return (
    <Link
      className="group flex flex-col border-gray-100 dark:border-gray-800 border-b"
      href={`/p/${post.properties.Slug.rich_text[0].plain_text}`}
    >
      {category != null && <PostCategory category={category} />}

      <div className="flex-grow">
        <h4 className="mt-2 mb-1 font-bold text-lg tracking-tight group-hover:opacity-60">
          <NotionText noLinks text={post.properties.Page.title} />
        </h4>

        <p className="line-clamp-2 text-base text-gray-800 dark:text-gray-200">
          <NotionText noLinks text={post.properties.Description.rich_text} />
        </p>
      </div>

      <div className="mt-6 mb-10 flex items-center gap-3">
        {authorExists && (
          <>
            {author.avatar_url != null ? (
              <Image
                alt={`Avatar of ${author.name}`}
                className="h-6 w-6 overflow-hidden rounded-full"
                height={24}
                src={await imageProxy(author.avatar_url, `${author.id}.jpg`)}
                width={24}
              />
            ) : (
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" />
            )}
            <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">
              {author.name}
            </span>
            <Divider />
          </>
        )}
        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">
          {formattedDate}
        </span>
      </div>
    </Link>
  );
};

export default PostItem;
