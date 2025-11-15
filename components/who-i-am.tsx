import { imageProxy } from "@lib/notion/image";
import NextImage from "next/image";
import Link from "next/link";

const PPImage = async () => (
  <NextImage
    alt="Who I am"
    className="rounded-full"
    height={80}
    src={
      await imageProxy(
        "https://avatars.githubusercontent.com/u/34143515?v=4",
        "paul-planchon.jpg"
      )
    }
    width={80}
  />
);

const Description = () => (
  <p className="text-gray-500 dark:text-gray-400">
    I'm Paul Planchon, a software engineer from Paris. I love solving complex
    problems with simple software. After reading so many blogs, I decided to
    start my own to share my thoughts and experiences. You can learn more about
    me{" "}
    <Link className="underline" href="https://p6n.dev">
      on my website
    </Link>
    .
  </p>
);

export const WhoIAm = async () => (
  <div className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-4 shadow-xl dark:border-blue-700 dark:bg-blue-950 dark:shadow-blue-900/50">
    {/* desktop */}
    <div className="hidden w-full flex-row items-center justify-center gap-x-6 md:flex">
      <PPImage />
      <div>
        <h2 className="font-heading text-xl">Who I am ?</h2>
        <Description />
      </div>
    </div>
    {/* mobile */}
    <div className="flex flex-col items-center justify-center gap-y-4 md:hidden">
      <div className="flex w-full flex-row items-center justify-center gap-x-12 px-8">
        <PPImage />
        <h2 className="font-heading text-lg">Who I am ?</h2>
      </div>
      <Description />
    </div>
  </div>
);
