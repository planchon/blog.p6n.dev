import NextImage from "next/image"

export const NotionImage: React.FC<{
  src: string
  alt: string
  blockId: string
}> = ({ src, alt, blockId }) => {
  return (
    <div className="imageContainer w-full">
      <NextImage
        src={src}
        alt={alt}
        fill
        className="nextImage p-0 rounded overflow-hidden"
        unoptimized={process.env.NODE_ENV !== "production"}
      />
    </div>
  )
}
