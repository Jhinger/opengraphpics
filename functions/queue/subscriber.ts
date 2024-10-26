import type { SQSEvent } from 'aws-lambda';

export async function handler(event: SQSEvent) {
	console.log('--------------------------------------------------------');
	console.log(event);
	console.log('--------------------------------------------------------');

	console.log('body: ', JSON.parse(event.Records[0].body));
	console.log('attributes: ', event.Records[0].attributes);
	return;
}
