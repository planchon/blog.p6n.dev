import Image from "next/image";
import type React from "react";
import { cn } from "../utils";
import { Blob } from "./Blob";
import Link from "./Link";

export const CustomerStories: React.FC = () => {
  return (
    <div
      className={cn("-mx-5 md:-mx-8 relative px-5 pt-20 pb-24 md:px-8")}
      style={{
        background:
          "linear-gradient(155.36deg, var(--secondaryBg) 14.3%, var(--background) 82.49%)",
      }}
    >
      <div className="pointer-events-none absolute top-0">
        <Blob />
      </div>

      <header className="mx-auto mb-12 flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="mb-3 font-heading text-[42px]">Customer Stories</h1>
          <p className="text-gray-600 text-lg">
            Learn how we keep the train going, on-time, and fire-free.
          </p>
        </div>

        {/* <Link
          href="/scaling-railway"
          className="md:col-span-2 text-center text-pink-700 border border-pink-200 rounded-md px-4 py-2 hover:text-pink-800 hover:border-pink-500 transition-colors duration-100"
        >
          All Scaling Railway Posts →
        </Link> */}
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <CustomerStoryPostItem
          avatars={["/customers/arcol-avatar.png", "/customers/arcol-paul.png"]}
          image="/customers/product-image--arcol.png"
          slug={"/p/software-for-architects-paul-ocarroll-arcol-interview"}
          title={
            <>
              Building a new cloud-based collaborative CAD tool. Q&A with Paul
              O&apos;Carroll from <span className="underline">Arcol</span>
            </>
          }
        />

        <CustomerStoryPostItem
          avatars={[
            "/customers/peerlist-avatar.png",
            "/customers/peerlist-yogini.png",
          ]}
          image="/customers/product-image--peerlist.png"
          slug={"/p/peerlist-professional-network-yogini-bende"}
          title={
            <>
              How <span className="underline">Peerlist</span> Built a New Kind
              of Professional Network with Railway
            </>
          }
        />
      </div>
    </div>
  );
};

const CustomerStoryPostItem: React.FC<{
  title: React.ReactElement;
  slug?: string;
  drops?: string;
  image: string;
  className?: string;
  avatars?: string[];
}> = ({ title, avatars, drops, slug, image, className }) => {
  const Wrapper = slug ? Link : "div";

  return (
    <Wrapper
      {...(slug != null ? ({ href: slug } as any) : {})}
      className={cn(
        "flex min-h-[288px] flex-col overflow-hidden rounded-tl-xl rounded-tr-[48px] rounded-br-xl rounded-bl-[32px] bg-gray-100 dark:bg-gray-50",
        "grid grid-cols-3 border border-black border-opacity-5 dark:border-white dark:border-opacity-5",
        slug != null ? "hover:bg-gray-200 dark:hover:bg-gray-100" : "",
        className
      )}
    >
      <div className="col-span-2 my-8 ml-8 flex flex-col justify-end">
        {drops != null && (
          <p className="mb-auto max-w-max whitespace-nowrap rounded bg-background px-2 py-1 font-medium text-gray-400 text-sm dark:bg-gray-100">
            Available on {drops}
          </p>
        )}

        <div
          className={cn("-space-x-2 flex", slug == null ? "opacity-40" : "")}
        >
          {avatars?.map((a, i) => (
            <img
              alt=""
              className="h-10 w-10 rounded-full"
              key={a}
              src={a}
              style={{ zIndex: 10 - i }}
            />
          ))}
        </div>

        <h3
          className={cn(
            "mt-7 mb-2 max-w-xs font-medium text-xl tracking-tight",
            slug == null ? "opacity-40" : ""
          )}
        >
          {title}
        </h3>
      </div>

      <div className="-rotate-6 relative h-full w-[250%]">
        <Image
          alt={`Product image for ${title}`}
          className={cn(
            "absolute top-0 left-0 md:top-[initial] md:bottom-0",
            slug == null ? "opacity-40" : ""
          )}
          height={840}
          src={`${image}`}
          style={{
            filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08))",
          }}
          width={1350}
        />
      </div>
    </Wrapper>
  );
};
