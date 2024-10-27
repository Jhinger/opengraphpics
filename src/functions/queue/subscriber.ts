import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { uploadImages } from '$lib/s3';
import type { SQSEvent } from 'aws-lambda';

type QueueMessage = {
	url: string;
	organization: string;
};

function path(url: string) {
	const urlObj = new URL(url);
	return urlObj.pathname === '/' ? '/index' : urlObj.pathname;
}

const LOCAL_CHROMIUM =
	'/tmp/localChromium/chromium/mac_arm-1374329/chrome-mac/Chromium.app/Contents/MacOS/Chromium';

export async function handler(event: SQSEvent) {
	console.log('event:', event);

	let browser;
	try {
		const message = JSON.parse(event.Records[0].body) as QueueMessage;
		const pathname = path(message.url);

		browser = await puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: process.env.SST_DEV ? LOCAL_CHROMIUM : await chromium.executablePath(),
			headless: chromium.headless
		});
		const page = await browser.newPage();

		await page.setViewport({
			width: 1920,
			height: 1080
		});
		await page.goto(message.url);

		const screenshot = await page.screenshot({ type: 'webp', encoding: 'binary', quality: 100 });
		uploadImages([
			{
				key: `${message.organization}${pathname}`,
				file: screenshot
			}
		]);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Successfully uploaded image for organization ${message.organization} on route ${message.url}`
			})
		};
	} catch (error) {
		console.log('error:', error);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: `Failed to upload image.`,
				error: error
			})
		};
	} finally {
		if (browser) {
			console.log('Closing browser');
			await browser.close();
		}
	}
}
