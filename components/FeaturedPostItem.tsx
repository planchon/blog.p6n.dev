import Link from "@components/Link";
import type { PostProps } from "@lib/types";
import dayjs from "dayjs";
import Image from "next/image";
import type React from "react";
import { useMemo } from "react";
import { Divider } from "./Divider";
import { NotionText } from "./NotionText";
import { PostCategory } from "./PostCategory";

export const FeaturedPostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date?.start ?? "")).format(
        "MMM D, YYYY"
      ),
    [post.properties.Date.date?.start]
  );

  const author = post.properties.Authors.people[0];
  const category = post.properties.Category.select?.name;
  const featuredImage = post.properties.Image.files[0].file.url;
  const authorExists = author != null && author.name != null;

  return (
    <Link
      className="group overflow-hidden rounded-xl bg-white p-2"
      href={`/p/${post.properties.Slug.rich_text[0].plain_text}`}
    >
      {featuredImage != null ? (
        <div className="relative aspect-[2.25/1] w-full overflow-hidden rounded-xl border border-black border-opacity-10">
          <Image
            alt={post.properties.Page.title[0].plain_text}
            className="object-cover transition-transform group-hover:scale-[1.05]"
            fill
            priority
            src={featuredImage}
          />
        </div>
      ) : (
        <div className="aspect-[2/1] w-full rounded-xl bg-gray-100" />
      )}

      <div className="mt-6">
        {category != null && <PostCategory category={category} />}

        <h3 className="my-4 font-heading text-2xl text-gray-900">
          {post.properties.Page.title[0].plain_text}
        </h3>

        <p className="line-clamp-2 text-gray-800 text-md">
          <NotionText noLinks text={post.properties.Description.rich_text} />
        </p>

        <div className="mt-6 flex items-center gap-3">
          {authorExists && (
            <>
              <Image
                alt={`Avatar of ${author.name}`}
                className="overflow-hidden rounded-full"
                height={24}
                src={author.avatar_url ?? ""}
                width={24}
              />
              <span className="font-medium text-gray-500 text-sm">
                {author.name}
              </span>
              <Divider />
            </>
          )}

          <span className="font-medium text-gray-500 text-sm">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
};
