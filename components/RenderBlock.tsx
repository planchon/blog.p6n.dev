/* eslint-disable @typescript-eslint/ban-ts-comment */

import { CodeBlock } from "@components/Code";
import { NotionHeading } from "@components/NotionHeading";
import { NotionImage } from "@components/NotionImage";
import { NotionText } from "@components/NotionText";
import { getMediaProperties } from "@lib/notion";
import type { Block } from "@notionhq/client/build/src/api-types";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { extractYoutubeId } from "utils";
import { NotionVideo } from "./NotionVideo";

interface Props {
	block: Block;
}

export const RenderBlock: React.FC<Props> = ({ block }) => {
	const { type } = block;
	const value = block[type];

	/**
	 * I don't like this but if we do multiple line breaks (enter key) in Notion,
	 * the API returns them as empty arrays and they go in the UI as a paragraph
	 * with no content but margin bottom of 32px
	 *
	 * The check below filters such items
	 */
	// @ts-expect-error: Current client version does not support `callout` but API does
	if (value.text != null && value.text.length === 0 && type !== "callout") {
		return null;
	}

	switch (type) {
		case "paragraph": {
			return (
				<p className="leading-8 mb-4 text-gray-800">
					<NotionText text={value.text} />
				</p>
			);
		}
		// @ts-expect-error: Current client version does not support `quote` but API does
		case "quote": {
			// const { source, caption } = getMediaProperties(value)
			return (
				<blockquote className="flex flex-col my-8 border-l-4 pl-4 border-gray-100 text-gray-700 italic">
					<NotionText text={value.text} />
				</blockquote>
			);
		}
		case "heading_1":
		case "heading_2":
		case "heading_3": {
			return (
				<div className="mt-12">
					<NotionHeading type={type} text={value.text} />
				</div>
			);
		}
		// @ts-expect-error: Current client version does not support `callout` but API does
		case "callout": {
			const callout = (block as any).callout;
			return (
				<div className="flex w-full p-4 my-8 rounded border border-transparent bg-gray-50">
					<div className="flex flex-col w-full">
						<div className="ml-4 text-foreground">
							<NotionText text={value.text} />
						</div>
						{callout.children ? (
							<div className="flex flex-col p-4">
								{callout.children.map((child) => (
									<RenderBlock block={child} />
								))}
							</div>
						) : null}
					</div>
				</div>
			);
		}
		case "bulleted_list_item":
			return (
				<li className="mb-2">
					<NotionText text={value.text} />
				</li>
			);
		case "numbered_list_item": {
			return (
				<li className="mb-2">
					<NotionText text={value.text} />
				</li>
			);
		}
		case "image": {
			const { source, caption } = getMediaProperties(value);
			return (
				<div className="flex flex-col mb-4">
					<NotionImage src={source} alt={caption} blockId={block.id} />
					{caption && <p className="text-gray-600 mt-3 text-sm">{caption}</p>}
				</div>
			);
		}
		// @ts-expect-error: Current client version does not support `code` but API does
		case "code": {
			return (
				<CodeBlock language={value.language} code={value.text[0].plain_text} />
			);
		}
		// @ts-expect-error: Current client version does not support `divider` but API does
		case "divider": {
			return <hr className="my-8" />;
		}
		case "video": {
			const { source, caption } = getMediaProperties(value);

			// Handle YT embeds
			const youtubeId = extractYoutubeId(source);
			if (youtubeId) {
				return (
					<div className="flex flex-col my-8 space-y-2">
						<iframe
							className="rounded-lg"
							src={`https://youtube.com/embed/${youtubeId}`}
							height={400}
						/>
					</div>
				);
			}

			return (
				<div className="flex flex-col my-8 space-y-2">
					<NotionVideo src={source} blockId={block.id} />
					{caption && <p className="text-gray-500 text-sm">{caption}</p>}
				</div>
			);
		}
		case "embed": {
			const url = block.embed.url;
			if (!url.includes("twitter.com")) {
				return null;
			}

			// const tweetId = url.split("/").pop()
			const regex = /status\/(\d+)/gm;
			const matches = regex.exec(url);
			const tweetId = matches[1];

			if (tweetId == null) return null;

			return (
				<div className="mb-6">
					<TwitterTweetEmbed tweetId={`${tweetId}`} />
				</div>
			);
		}
		// @ts-expect-error: Current client version does not support `column_list` but API does
		case "column_list": {
			return (
				<div className="grid grid-cols-2 items-start gap-8">
					{/* @ts-ignore: Current client version does not support `column_list` but API does */}
					{block.column_list.children.map((block) => (
						<RenderBlock key={block.id} block={block} />
					))}
				</div>
			);
		}
		// @ts-expect-error: Current client version does not support `column_list` but API does
		case "column": {
			return (
				<div className="flex flex-col space-y-4">
					{/* @ts-ignore: Current client version does not support `column_list` but API does */}
					{block.column.map((block) => (
						<RenderBlock key={block.id} block={block} />
					))}
				</div>
			);
		}
		default: {
			return null;
			// return (
			//   <p>
			//     ❌ Unsupported block{" "}
			//     {type === "unsupported" ? "unsupported by Notion API" : type}
			//   </p>
			// )
		}
	}
};
