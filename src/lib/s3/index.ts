import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Resource } from 'sst';

export const s3Client = new S3Client({ region: 'us-east-2' });

export type ImageToUpload = {
	key: string;
	file: File;
};

export function uploadImages(images: ImageToUpload[]) {
	if (images.length === 0) return { success: false };

	images.forEach(async (image) => {
		const bytes = await image.file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const command = new PutObjectCommand({
			Bucket: Resource.OpenGraphPicsBucket.name,
			Key: image.key,
			Body: buffer,
			ContentType: image.file.type
		});

		try {
			await s3Client.send(command);
		} catch (error) {
			return { success: false };
		}
	});

	return { success: true };
}
