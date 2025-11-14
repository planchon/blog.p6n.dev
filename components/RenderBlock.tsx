/* eslint-disable @typescript-eslint/ban-ts-comment */

import { CodeBlock } from "@components/Code";
import { NotionHeading } from "@components/NotionHeading";
import { NotionImage } from "@components/NotionImage";
import { NotionText } from "@components/NotionText";
import { getMediaProperties } from "@lib/notion";
import type { Block } from "@notionhq/client/build/src/api-types";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { cn, extractYoutubeId } from "utils";
import { Mermaid } from "./Mermaid";
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
        <p className="mb-4 text-gray-800 dark:text-gray-200 leading-8">
          <NotionText text={value.text} />
        </p>
      );
    }
    // @ts-expect-error: Current client version does not support `quote` but API does
    case "quote": {
      // const { source, caption } = getMediaProperties(value)
      return (
        <blockquote className="my-8 flex flex-col border-gray-100 dark:border-gray-800 border-l-4 pl-4 text-gray-700 dark:text-gray-300 italic">
          <NotionText text={value.text} />
        </blockquote>
      );
    }
    case "heading_1":
    case "heading_2":
    case "heading_3": {
      return (
        <div className="mt-12">
          <NotionHeading text={value.text} type={type} />
        </div>
      );
    }
    // @ts-expect-error: Current client version does not support `callout` but API does
    case "callout": {
      const callout = (block as any).callout;
      const color_mapping = {
        gray_background: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200",
        blue_background: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
        green_background: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
        yellow_background: "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
        red_background: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
        purple_background: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200",
        orange_background: "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200",
        pink_background: "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800 text-pink-800 dark:text-pink-200",
        brown_background: "bg-brown-50 dark:bg-brown-900/30 border-brown-200 dark:border-brown-800 text-brown-800 dark:text-brown-200",
      };

      const bg_color = color_mapping[callout.color];
      return (
        <div
          className={cn(
            "my-8 flex w-full rounded-lg border p-4 shadow-gray-200/50 dark:shadow-gray-900/50 shadow-md",
            bg_color
          )}
        >
          <div className="flex w-full flex-col">
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
        <div className="mb-4 flex flex-col">
          <NotionImage alt={caption} blockId={block.id} src={source} />
          {/* {caption && <p className="mt-3 text-gray-600 text-sm">{caption}</p>} */}
        </div>
      );
    }
    // @ts-expect-error: Current client version does not support `code` but API does
    case "code": {
      if (value.language === "mermaid") {
        return <Mermaid chart={value.text[0].plain_text} />;
      }
      return (
        <CodeBlock code={value.text[0].plain_text} language={value.language} />
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
          <div className="my-8 flex flex-col space-y-2">
            <iframe
              className="rounded-lg"
              height={400}
              src={`https://youtube.com/embed/${youtubeId}`}
            />
          </div>
        );
      }

      return (
        <div className="my-8 flex flex-col space-y-2">
          <NotionVideo blockId={block.id} src={source} />
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
      const tweetId = matches?.[1];

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
            <RenderBlock block={block} key={block.id} />
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
            <RenderBlock block={block} key={block.id} />
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
