import { NotionHeading } from "@components/NotionHeading";
import Page from "@layouts/Page";
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
		posts.findLast((post) => post.properties.Featured.checkbox) ??
		posts[posts.length - 1];

	return (
		<Page>
			<div className="px-5 md:px-8">
				<div className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					<div className="w-full flex flex-col justify-between">
						<div>
							<NotionHeading
								link={`/p/${featuredPosts.properties.Slug.rich_text[0].plain_text}`}
								type="heading_1"
								text={featuredPosts.properties.Page.title}
							/>
							<p className="text-gray-500">
								{featuredPosts.properties.Description.rich_text[0].plain_text}
							</p>
						</div>
						<div className="">
							<Link
								href={`/p/${featuredPosts.properties.Slug.rich_text[0].plain_text}`}
								className="font-bold"
							>
								Read more
							</Link>
						</div>
					</div>
					<div className="w-full">
						<NextImage
							src={
								await imageProxy(
									featuredPosts.properties.Image.files[0].file.url,
									featuredPosts.properties.Image.files[0].name,
								)
							}
							alt={featuredPosts.properties.Page.title[0].plain_text}
							width={800}
							height={500}
							className="p-0 rounded-md"
						/>
					</div>
				</div>
			</div>
			<PostList posts={posts} />
		</Page>
	);
}

export default Home;
