import Link from "@components/Link";
import { NotionText } from "@components/NotionText";
import type { RichText } from "@notionhq/client/build/src/api-types";
import { cn } from "utils";

const convertHeadingToId = (heading: RichText[]) =>
  heading[0].plain_text.toLowerCase().replace(/\s/g, "-").replace(/[?!:]/g, "");

type HeadingTypes = "heading_1" | "heading_2" | "heading_3";
type HeadingConfig = {
  classes: string;
  as: string;
};
const headingConfig: Record<HeadingTypes, HeadingConfig> = {
  heading_1: {
    classes: "text-4xl font-heading leading-snug mt-16 mb-8",
    as: "h1",
  },
  heading_2: {
    classes: "text-h2 font-heading mt-10 mb-5",
    as: "h2",
  },
  heading_3: {
    classes: "text-xl font-bold mt-6 mb-4",
    as: "h3",
  },
};

type Props = {
  type: HeadingTypes;
  text: RichText[];
  link?: string;
  className?: string;
};
export const NotionHeading: React.FC<Props> = ({
  type,
  text,
  link,
  className,
}) => {
  const id = convertHeadingToId(text);
  const config = headingConfig[type];

  const href = link ?? `#${id}`;

  return (
    <Link className="relative" href={href}>
      {/* Link to something that is slightly above the actual heading to leave some padding */}
      <span
        aria-hidden="true"
        className="absolute top-[-2rem] inline-block w-px"
        id={id}
      />

      {type === "heading_1" && (
        <h1 className={cn(config.classes, className)}>
          <NotionText text={text} />
        </h1>
      )}
      {type === "heading_2" && (
        <h2 className={cn(config.classes, className)}>
          <NotionText text={text} />
        </h2>
      )}
      {type === "heading_3" && (
        <h3 className={cn(config.classes, className)}>
          <NotionText text={text} />
        </h3>
      )}
    </Link>
  );
};
