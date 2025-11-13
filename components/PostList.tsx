import type React from "react";
import type { PostProps } from "../lib/types";
import { FeaturedPostItem } from "./FeaturedPostItem";
import PostItem from "./PostItem";

export const PostList: React.FC<{
  posts: PostProps[];
  category?: string;
  showScalingRailway?: boolean;
  showCustomerStories?: boolean;
}> = ({ posts }) => {
  const featuredPosts = posts.filter(
    (p) => p.properties.Featured.checkbox && !p.properties.homepage.checkbox
  );
  const otherPosts = posts.filter(
    (p) => !p.properties.Featured.checkbox && !p.properties.homepage.checkbox
  );

  return (
    <>
      <div className="px-5 md:px-8">
        <div className="mx-auto mb-24 max-w-6xl">
          {featuredPosts.length >= 2 && (
            <>
              <div className="mb-6">
                <h2 className="font-heading text-xl">
                  Must read <span className="italic">billets</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 md:gap-y-12">
                {featuredPosts.map((p) => (
                  <FeaturedPostItem key={p.id} post={p} />
                ))}
              </div>
            </>
          )}
        </div>

        {otherPosts.length > 0 && (
          <div className="mx-auto mt-24 mb-24 max-w-6xl">
            <div className="container flex flex-col justify-center gap-x-8 gap-y-8">
              {otherPosts.map((p) => (
                <PostItem key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
