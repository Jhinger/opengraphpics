import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Resource } from 'sst';

export const s3Client = new S3Client({ region: 'us-east-2' });

export type ImageToUpload = {
	key: string;
	file: File | Buffer;
};

export function uploadImages(images: ImageToUpload[]) {
	if (images.length === 0) return { success: false };

	images.forEach(async (image) => {
		const bytes = image.file instanceof File ? await image.file.arrayBuffer() : image.file;
		const buffer = Buffer.from(bytes);

		const command = new PutObjectCommand({
			Bucket: Resource.OpenGraphPicsBucket.name,
			Key: image.key,
			Body: buffer,
			ContentType: image.file instanceof File ? image.file.type : 'image/webp'
		});

		try {
			await s3Client.send(command);
		} catch (error) {
			return { success: false };
		}
	});

	return { success: true };
}
