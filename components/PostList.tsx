import React from "react"
import { PostProps } from "../lib/types"
import { Categories } from "./Categories"
import { CustomerStories } from "./CustomerStories"
import { FeaturedPostItem } from "./FeaturedPostItem"
import PostItem from "./PostItem"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const PostList: React.FC<{
  posts: PostProps[]
  category?: string
  showScalingRailway?: boolean
  showCustomerStories?: boolean
}> = ({ posts, category, showCustomerStories }) => {
  const featuredPosts = posts.filter((p) => p.properties.Featured.checkbox)
  const otherPosts = posts.filter((p) => !p.properties.Featured.checkbox)

  return (
    <>
      <div className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto mb-24">
          {featuredPosts.length >= 3 && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-heading">
                  Must read <span className="italic">billets</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-12">
                {featuredPosts.map((p) => (
                  <FeaturedPostItem key={p.id} post={p} />
                ))}
              </div>
            </>
          )}
        </div>

        {otherPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mb-24 mt-24 ">
            <div className="gap-x-8 gap-y-8 container flex flex-col justify-center">
              {otherPosts.map((p) => (
                <PostItem key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
