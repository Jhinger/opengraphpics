import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Resource } from 'sst';

export class Queue {
	private client: SQSClient;

	constructor() {
		this.client = new SQSClient();
	}

	async sendMessage(message: Record<string, unknown>) {
		const command = new SendMessageCommand({
			QueueUrl: Resource.OpenGraphPicsQueue.url,
			MessageBody: JSON.stringify(message)
		});

		await this.client.send(command);
	}
}
