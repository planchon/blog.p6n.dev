import { imageProxy } from "@lib/notion/image";
import NextImage from "next/image";
import { ImageZoom } from "./Image";

export const NotionImage: React.FC<{
  src: string;
  alt: string;
  blockId: string;
}> = async ({ src, alt, blockId }) => {
  // if size=width,height in the caption, use that as the height of the image
  const match = /size=(\d+),(\d+)/gm.exec(alt);
  let fill = true;
  let width: number | undefined;
  let height: number | undefined;
  let newAlt = alt;

  if (match) {
    fill = false;
    width = Number.parseInt(match[1], 10);
    height = Number.parseInt(match[2], 10);
    newAlt = newAlt.replace(/size=(\d+),(\d+)/g, "");
  }

  console.log(match);

  return (
    <div className="flex w-full items-center justify-center">
      <ImageZoom className="imageContainer max-w-[760px]">
        <NextImage
          alt={newAlt}
          className="nextImage overflow-hidden rounded p-0"
          fill={fill}
          height={height}
          src={await imageProxy(src, `${blockId}.jpg`)}
          unoptimized={process.env.NODE_ENV !== "production"}
          width={width}
        />
      </ImageZoom>
    </div>
  );
};
