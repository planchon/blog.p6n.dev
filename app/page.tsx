import { Divider } from "@components/Divider";
import { NotionHeading } from "@components/NotionHeading";
import { PostCategory } from "@components/PostCategory";
import { WhoIAm } from "@components/who-i-am";
import { getDatabase } from "@lib/notion";
import { imageProxy } from "@lib/notion/image";
import dayjs from "dayjs";
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

  const category = featuredPosts.properties.Category.select?.name;
  const author = featuredPosts.properties.Authors.people[0];
  const authorExists = author != null && author.name != null;
  const formattedDate = dayjs(
    new Date(featuredPosts.properties.Date.date?.start ?? "")
  ).format("MMM D, YYYY");

  return (
    <div className="flex flex-col gap-y-12">
      <div className="px-5 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-x-8 gap-y-2 md:flex-row md:gap-y-6">
          <div className="flex w-full flex-col justify-between">
            <div className="flex flex-col gap-y-4">
              <NotionHeading
                className="mt-4 mb-0"
                link={`/p/${featuredPosts.properties.Slug.rich_text[0].plain_text}`}
                text={featuredPosts.properties.Page.title}
                type="heading_1"
              />
              <div className="flex flex-row items-center gap-x-4">
                <div className="flex items-center gap-3">
                  {authorExists && author.avatar_url != null && (
                    <>
                      <NextImage
                        alt={`Avatar of ${author.name}`}
                        className="overflow-hidden rounded-full"
                        height={24}
                        src={
                          await imageProxy(
                            author.avatar_url,
                            `${author.id}.jpg`
                          )
                        }
                        unoptimized={process.env.NODE_ENV !== "production"}
                        width={24}
                      />
                      <span className="font-medium text-gray-500 text-sm dark:text-gray-400">
                        {author.name}
                      </span>
                      <Divider />
                    </>
                  )}

                  <span className="font-medium text-gray-500 text-sm dark:text-gray-400">
                    {formattedDate}
                  </span>
                </div>
                {category != null && <PostCategory category={category} />}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {featuredPosts.properties.Description.rich_text[0].plain_text}
              </p>
            </div>
            <div className="mt-5 md:mt-2">
              <Link
                className="rounded-md border border-gray-500 border-opacity-30 px-2 py-1 font-semibold text-gray-700 text-sm transition-all duration-300 hover:shadow-gray-200 hover:shadow-md dark:border-gray-400 dark:border-opacity-30 dark:text-gray-400 dark:hover:shadow-gray-800"
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
      <div className="mx-auto flex w-full max-w-6xl justify-center px-5 sm:px-4 xl:px-0">
        <WhoIAm />
      </div>
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
