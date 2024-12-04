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
import { Metadata } from "next"
import { WithContext, BlogPosting } from "schema-dts"

export const dynamicParams = false

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID)
  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.properties.Page.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    authors: post.properties.Authors.people.map((author) => ({
      name: author.name,
      url: author.avatar_url,
    })),
    creator: post.properties.Authors.people[0].name,
    robots: {
      index: true,
      follow: true,
    },
    keywords: post.properties.Category.select.name,
    abstract: post.properties.Description.rich_text[0].plain_text,
    openGraph: {
      title: post.properties.Page.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      images: [post.properties.Image.files[0].file.url],
    },
  }
}

export async function Post(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug

  const post = await getPost(slug)
  const blockProps = await mapDatabaseItemToPageProps(post.id)

  const jsonLD: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://p6n.blog/p/${slug}`,
    author: post.properties.Authors.people[0].name,
    image: post.properties.Image.files[0].file.url,
    datePublished: post.properties.Date.date.start,
    dateModified: post.properties.Date.date.start,
    description: post.properties.Description.rich_text[0].plain_text,
    headline: post.properties.Page.title[0].plain_text,
    url: `https://p6n.blog/p/${slug}`,
  }

  const blocks = groupListBlocks(blockProps.blocks)

  return (
    <PostPage post={post} relatedPosts={[]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
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
