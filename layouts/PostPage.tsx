import { NotionText } from "@components/NotionText";
import { imageProxy } from "@lib/notion/image";
import type { PostProps } from "@lib/types";
import dayjs from "dayjs";
import Image from "next/image";
import type React from "react";
import { ContinueReading } from "../components/ContinueReading";
import { Divider } from "../components/Divider";
import { cn } from "../utils";

export interface Props {
  post: PostProps;
  relatedPosts: PostProps[];
  children?: React.ReactNode;
}

export const PostPage: React.FC<Props> = async ({
  post,
  relatedPosts,
  children,
}) => {
  const author = post.properties.Authors.people[0];
  const authorExists = author != null && author.name != null;

  const category = post.properties.Category?.select?.name;

  return (
    <div>
      <div className="mx-auto mt-10 mb-5 px-5 md:px-8">
        <article
          className={cn(
            "mx-auto mt-24 mb-12 max-w-6xl",
            relatedPosts.length >= 2
              ? "border-gray-100 border-b pb-32"
              : "pb-12"
          )}
        >
          <div className="flex items-center space-x-3 text-gray-500">
            {authorExists && author?.avatar_url != null && (
              <>
                <div className="flex items-center space-x-3">
                  <Image
                    alt={`Avatar of ${author?.name}`}
                    className="h-6 w-6 overflow-hidden rounded-full"
                    height={24}
                    src={
                      await imageProxy(author?.avatar_url, `${author?.id}.jpg`)
                    }
                    width={24}
                  />
                  <span>{author?.name}</span>
                </div>
                <Divider />
              </>
            )}
            <time dateTime={post.properties.Date.date?.start ?? ""}>
              {dayjs(post.properties.Date.date?.start ?? "").format(
                "MMM D, YYYY"
              )}
            </time>
          </div>

          <header className="mt-5 mb-16 max-w-[800px]">
            <h1 className="font-heading text-huge">
              <NotionText text={post.properties.Page.title} />
            </h1>
          </header>

          <section className="mx-auto max-w-[970px] text-base leading-8 sm:text-lg">
            {children}
          </section>
        </article>

        <div className="mx-auto max-w-6xl">
          {category != null && relatedPosts.length >= 2 && (
            <ContinueReading category={category} posts={relatedPosts} />
          )}
        </div>
      </div>
    </div>
  );
};
