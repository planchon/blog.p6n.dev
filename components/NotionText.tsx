import Link from "@components/Link";
import type React from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

/**
 * This type is harcoded here as I couldn't really find anything
 * in the Notion API that corresponds to the actual data
 */
type TextProps = {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string;
  plain_text: string;
  text?: {
    content: string;
    link?: {
      url: string;
    };
  };
  type: string;
};

const RenderTextContent: React.FC<{
  isCode: boolean;
  content: string;
  className?: string;
}> = ({ isCode, content, className }) =>
  isCode ? (
    <code className="whitespace-normal break-words rounded-md border border-gray-200 bg-gray-100 p-2 py-1 text-sm">
      {content}
    </code>
  ) : (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: content.replace("\n", "<br/>") }}
    />
  );

export const NotionText: React.FC<{
  text: TextProps[] | null;
  noLinks?: boolean;
}> = ({ text, noLinks }) => {
  if (text == null) {
    return null;
  }

  return (
    <>
      {text.map((value, idx) => {
        const {
          annotations: { bold, code, italic, strikethrough, underline },
          text,
        } = value;
        if (text == null) {
          return null;
        }

        let classes = "";
        if (bold) classes += "font-semibold";
        if (italic) classes += " italic";
        if (strikethrough) classes += " line-through";
        if (underline) classes += " underline";

        return (
          <Fragment key={idx}>
            {text.link != null ? (
              <>
                <Link
                  className="underline hover:text-gray-950"
                  href={text.link.url}
                >
                  <RenderTextContent
                    className={classes}
                    content={text.content ?? text.link.url}
                    isCode={code}
                  />
                </Link>
              </>
            ) : (
              <RenderTextContent
                className={classes}
                content={text.content}
                isCode={code}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export const NotionList: React.FC<{
  type: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ type, children, className }) =>
  type === "ul" ? (
    <ul className={twMerge("mb-6 list-disc pl-6", className)}>{children}</ul>
  ) : (
    <ol className={twMerge("mb-6 list-disc pl-6", className)}>{children}</ol>
  );
