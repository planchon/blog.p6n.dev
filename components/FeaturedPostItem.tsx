import Link from "@components/Link"
import { PostProps } from "@lib/types"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import { Divider } from "./Divider"
import { NotionText } from "./NotionText"
import { PostCategory } from "./PostCategory"
import Image from "next/image"
import { NotionHeading } from "./NotionHeading"

export const FeaturedPostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date.start)).format("MMM D, YYYY"),
    [post.properties.Date.date.start]
  )

  const author = post.properties.Authors.people[0]
  const category = post.properties.Category.select?.name
  const featuredImage = post.properties.FeaturedImage.url
  const authorExists = author != null && author.name != null

  return (
    <Link
      href={`/p/${post.properties.Slug.rich_text[0].plain_text}`}
      className="group bg-white rounded-xl overflow-hidden p-2"
    >
      {featuredImage != null ? (
        <div className="w-full aspect-[2.25/1] relative border border-black border-opacity-10 rounded-xl overflow-hidden">
          <Image
            src={featuredImage}
            fill
            priority
            alt={post.properties.Page.title[0].plain_text}
            className="object-cover transition-transform group-hover:scale-[1.05]"
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/1] bg-gray-100 rounded-xl" />
      )}

      <div className="mt-6">
        {category != null && <PostCategory category={category} />}

        <h3 className="font-heading text-2xl my-4 text-gray-900">
          {post.properties.Page.title[0].plain_text}
        </h3>

        <p className="text-lg text-gray-800 line-clamp-2">
          <NotionText text={post.properties.Description.rich_text} noLinks />
        </p>

        <div className="flex items-center gap-3 mt-6">
          {authorExists && (
            <>
              <Image
                src={author.avatar_url}
                alt={`Avatar of ${author.name}`}
                className="rounded-full overflow-hidden"
                width={24}
                height={24}
              />
              <span className="font-medium text-sm text-gray-500">
                {author.name}
              </span>
              <Divider />
            </>
          )}

          <span className="font-medium text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  )
}
