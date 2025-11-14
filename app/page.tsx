import { NotionHeading } from "@components/NotionHeading";
import { getDatabase } from "@lib/notion";
import { imageProxy } from "@lib/notion/image";
import NextImage from "next/image";
import Link from "next/link";
import { PostList } from "../components/PostList";

export const revalidate = 3600;

async function Home() {
  if (process.env.POSTS_TABLE_ID == null) {
    throw new Error("POSTS_TABLE_ID is not set");
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID);

  const featuredPosts =
    posts.findLast((post) => post.properties.homepage.checkbox) ?? posts.at(-1);

  if (!featuredPosts) {
    return <div>No featured posts found</div>;
  }

  return (
    <div>
      <div className="px-5 md:px-8">
        <div className="mx-auto mb-24 flex max-w-6xl flex-col-reverse items-center gap-x-8 gap-y-2 md:flex-row md:gap-y-6">
          <div className="flex w-full flex-col justify-between">
            <div>
              <NotionHeading
                className="mt-4"
                link={`/p/${featuredPosts.properties.Slug.rich_text[0].plain_text}`}
                text={featuredPosts.properties.Page.title}
                type="heading_1"
              />
              <p className="text-gray-500 dark:text-gray-400">
                {featuredPosts.properties.Description.rich_text[0].plain_text}
              </p>
            </div>
            <div className="mt-4 md:mt-2">
              <Link
                className="rounded-md border border-gray-500 border-opacity-30 px-2 py-1 font-bold transition-all duration-300 hover:shadow-gray-200 hover:shadow-md dark:border-gray-400 dark:border-opacity-30 dark:hover:shadow-gray-800"
                href={`/p/${featuredPosts.properties.Slug.rich_text[0].plain_text}`}
              >
                Read more
              </Link>
            </div>
          </div>
          <div className="flex w-full items-center justify-center overflow-hidden rounded-md shadow-gray-400 shadow-lg dark:shadow-gray-900">
            <NextImage
              alt={featuredPosts.properties.Page.title[0].plain_text}
              height={500}
              src={
                await imageProxy(
                  featuredPosts.properties.Image.files[0].file.url,
                  featuredPosts.properties.Image.files[0].name
                )
              }
              width={800}
            />
          </div>
        </div>
      </div>
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
