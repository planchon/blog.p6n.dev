import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
	endpoint: process.env.CLOUDFLARE_R2_ENDPOINT, // e.g. "https://<accountid>.r2.cloudflarestorage.com"
	region: "auto",
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
	},
});

export const imageProxy = async (url: string, fileName: string) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Error fetching image from ${url}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: fileName,
			Body: buffer,
			ContentType:
				response.headers.get("content-type") || "application/octet-stream",
			ACL: "public-read",
		}),
	);

	// Public URL for Cloudflare R2 (format may vary based on your setup)
	const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL}/${fileName}`;
	return publicUrl;
};
