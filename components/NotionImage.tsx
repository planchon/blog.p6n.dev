import { imageProxy } from "@lib/notion/image";
import NextImage from "next/image";

export const NotionImage: React.FC<{
	src: string;
	alt: string;
	blockId: string;
}> = async ({ src, alt, blockId }) => {
	return (
		<div className="imageContainer w-full">
			<NextImage
				src={await imageProxy(src, `${blockId}.jpg`)}
				alt={alt}
				fill
				className="nextImage p-0 rounded overflow-hidden"
				unoptimized={process.env.NODE_ENV !== "production"}
			/>
		</div>
	);
};
