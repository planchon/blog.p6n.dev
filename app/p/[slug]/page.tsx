import { Block } from "@notionhq/client/build/src/api-types"
import { Fragment } from "react"

import { PostPage } from "@layouts/PostPage"
import {
  getDatabase,
  groupListBlocks,
  mapDatabaseItemToPageProps,
} from "@lib/notion"
import { ListBlock } from "@lib/types"

import { RenderBlock } from "@components/RenderBlock"
import { NotionListBlock } from "@components/ListBlock"

export async function Post(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug

  const post = await getPost(slug)
  const blockProps = await mapDatabaseItemToPageProps(post.id)

  const blocks = groupListBlocks(blockProps.blocks)

  return (
    <PostPage post={post} relatedPosts={[]}>
      {blocks.map((block) => {
        if ((block as ListBlock).items != null) {
          return <NotionListBlock key={block.id} block={block as ListBlock} />
        }

        return (
          <Fragment key={block.id}>
            <RenderBlock block={block as Block} />
          </Fragment>
        )
      })}
    </PostPage>
  )
}

export async function getPost(slug: string) {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID, {
    includeUnpublished: true,
  })

  const post = posts.find((post) => {
    return post.properties.Slug.rich_text[0].plain_text === slug
  })

  return post
}

export default Post
