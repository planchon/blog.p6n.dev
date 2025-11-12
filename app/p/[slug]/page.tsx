import { NotionListBlock } from "@components/ListBlock";
import { RenderBlock } from "@components/RenderBlock";

import { PostPage } from "@layouts/PostPage";
import {
  getDatabase,
  groupListBlocks,
  mapDatabaseItemToPageProps,
} from "@lib/notion";
import { imageProxy } from "@lib/notion/image";
import type { ListBlock } from "@lib/types";
import type { Block } from "@notionhq/client/build/src/api-types";
import type { Metadata } from "next";
import { Fragment } from "react";
import type { BlogPosting, WithContext } from "schema-dts";

export const dynamicParams = false;

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID);
  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);

  const image = await imageProxy(
    post.properties.Image.files[0].file.url,
    post.properties.Image.files[0].name
  );

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
    twitter: {
      title: post.properties.Page.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      images: [image],
    },
    openGraph: {
      title: post.properties.Page.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      images: [image],
    },
  };
}

export async function Post(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug;

  const post = await getPost(slug);
  const blockProps = await mapDatabaseItemToPageProps(post.id);

  const jsonLD: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://p6n.blog/p/${slug}`,
    author: post.properties.Authors.people[0].name,
    image: await imageProxy(
      post.properties.Image.files[0].file.url,
      post.properties.Image.files[0].name
    ),
    datePublished: post.properties.Date.date.start,
    dateModified: post.properties.Date.date.start,
    description: post.properties.Description.rich_text[0].plain_text,
    headline: post.properties.Page.title[0].plain_text,
    url: `https://p6n.blog/p/${slug}`,
  };

  const blocks = groupListBlocks(blockProps.blocks);

  return (
    <PostPage post={post} relatedPosts={[]}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        type="application/ld+json"
      />
      {blocks.map((block) => {
        if ((block as ListBlock).items != null) {
          return <NotionListBlock block={block as ListBlock} key={block.id} />;
        }

        return (
          <Fragment key={block.id}>
            <RenderBlock block={block as Block} />
          </Fragment>
        );
      })}
    </PostPage>
  );
}

export async function getPost(slug: string) {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID, {
    includeUnpublished: true,
  });

  const post = posts.find(
    (post) => post.properties.Slug.rich_text[0].plain_text === slug
  );

  return post;
}

export default Post;
