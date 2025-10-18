import { imageProxy } from "@lib/notion/image";

export const NotionVideo: React.FC<{
	src: string;
	blockId: string;
}> = async ({ src, blockId }) => {
	return (
		<video
			src={await imageProxy(src, `${blockId}.mp4`)}
			controls
			autoPlay
			loop
			muted
			className="rounded-lg"
		/>
	);
};
