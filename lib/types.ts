import type {
  Block,
  CheckboxPropertyValue,
  DatePropertyValue,
  Page,
  PersonUser,
  RichTextPropertyValue,
  SelectPropertyValue,
  TitlePropertyValue,
  URLPropertyValue,
} from "@notionhq/client/build/src/api-types";

export type PostItem = {
  Page: TitlePropertyValue;
  Slug: RichTextPropertyValue;
  Published: CheckboxPropertyValue;
  Featured: CheckboxPropertyValue;
  Date: DatePropertyValue;
  Authors: { people: PersonUser[] };
  Image: { files: { name: string; file: { url: string } }[] };
  FeaturedImage: URLPropertyValue;
  Description: RichTextPropertyValue;
  Category: SelectPropertyValue;
  homepage: CheckboxPropertyValue;
};

export interface PostProps extends Omit<Page, "properties"> {
  properties: PostItem;
}

export type ListBlock = {
  id: string;
  type: string;
  items: Block[];
};
