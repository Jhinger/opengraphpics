import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Resource } from 'sst';

export const s3Client = new S3Client({ region: 'us-east-2' });

export type ImageToUpload = {
	key: string;
	file: File | Buffer | Uint8Array;
};

export async function uploadImages(images: ImageToUpload[]) {
	if (images.length === 0) return { success: false };

	await Promise.all(
		images.map(async (image) => {
			const buffer =
				image.file instanceof Buffer
					? image.file
					: image.file instanceof File
						? Buffer.from(await image.file.arrayBuffer())
						: Buffer.from(image.file);

			const command = new PutObjectCommand({
				Bucket: Resource.OpenGraphPicsBucket.name,
				Key: image.key,
				Body: buffer,
				ContentType: image.file instanceof File ? image.file.type : 'image/webp'
			});

			await s3Client.send(command);
		})
	);

	return { success: true };
}
