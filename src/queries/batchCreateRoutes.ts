import { dbClient } from '$lib/auth';
import { BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';

export default async function batchCreateRoutes(organization: string, routes: string[]) {
	const params = {
		RequestItems: {
			[Resource.OpenGraphPicsDB.name]: [
				...routes.map((route) => {
					const path = new URL(route).pathname;
					return {
						PutRequest: {
							Item: {
								pk: { S: `ORG#${organization}` },
								sk: { S: `ROUTE#${path}` },
								createdAt: { S: new Date().toISOString() },
								updatedAt: { S: new Date().toISOString() },
								queued: { BOOL: true }
							}
						}
					};
				})
			]
		}
	};

	try {
		const response = await dbClient.send(new BatchWriteItemCommand(params));
		console.log(response);

		if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
			throw new Error('Some or all of the items were not processed.');
		}

		return response;
	} catch (error) {
		console.error(error);
	}
}
