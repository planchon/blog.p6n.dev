import {
  CheckboxPropertyValue,
  DatePropertyValue,
  Page,
  PersonUser,
  RichTextPropertyValue,
  TitlePropertyValue,
  URLPropertyValue,
  SelectPropertyValue,
  Block,
} from "@notionhq/client/build/src/api-types"

export interface PostItem {
  Page: TitlePropertyValue
  Slug: RichTextPropertyValue
  Published: CheckboxPropertyValue
  Featured: CheckboxPropertyValue
  Date: DatePropertyValue
  Authors: { people: PersonUser[] }
  Image: { files: { file: { url: string } }[] }
  FeaturedImage: URLPropertyValue
  Description: RichTextPropertyValue
  Category: SelectPropertyValue
}

export interface PostProps extends Omit<Page, "properties"> {
  properties: PostItem
}

export interface ListBlock {
  id: string
  type: string
  items: Block[]
}
