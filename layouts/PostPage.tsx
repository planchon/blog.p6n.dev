import { NotionText } from "@components/NotionText";
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

export const PostPage: React.FC<Props> = ({ post, relatedPosts, children }) => {
	const author = post.properties.Authors.people[0];
	const authorExists = author != null && author.name != null;

	const category = post.properties.Category?.select?.name;

	return (
		<div>
			<div className="mt-10 mb-5 px-5 md:px-8 mx-auto">
				<article
					className={cn(
						"max-w-6xl mx-auto mt-24 mb-12",
						relatedPosts.length >= 2
							? "border-b border-gray-100 pb-32"
							: "pb-12",
					)}
				>
					<div className="flex items-center text-gray-500 space-x-3">
						{authorExists && (
							<>
								<div className="flex items-center space-x-3">
									<Image
										src={author?.avatar_url}
										alt={`Avatar of ${author?.name}`}
										width={24}
										height={24}
										className="w-6 h-6 rounded-full overflow-hidden"
									/>
									<span>{author?.name}</span>
								</div>
								<Divider />
							</>
						)}
						<time dateTime={post.properties.Date.date.start}>
							{dayjs(post.properties.Date.date.start).format("MMM D, YYYY")}
						</time>
					</div>

					<header className="mt-5 mb-16 max-w-[800px]">
						<h1 className="text-huge font-heading">
							<NotionText text={post.properties.Page.title} />
						</h1>
					</header>

					<section className="max-w-[736px] mx-auto text-base sm:text-lg leading-8">
						{children}
					</section>
				</article>

				<div className="max-w-6xl mx-auto">
					{category != null && relatedPosts.length >= 2 && (
						<ContinueReading category={category} posts={relatedPosts} />
					)}
				</div>
			</div>
		</div>
	);
};
