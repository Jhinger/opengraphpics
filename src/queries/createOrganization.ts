import { dbClient } from '$lib/auth';
import { BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { redirect, fail } from '@sveltejs/kit';
import { Resource } from 'sst';

export default async function createOrganization(
	organization: string,
	domain: string,
	userEmail?: string
) {
	if (!userEmail) return redirect(302, '/login');

	const params = {
		RequestItems: {
			[Resource.OpenGraphPicsDB.name]: [
				{
					PutRequest: {
						Item: {
							pk: { S: `ORG#${organization}` },
							sk: { S: `METADATA` },
							numMembers: { N: '1' },
							subscription: { S: 'FREE' },
							domain: { S: domain }
						}
					}
				},
				{
					PutRequest: {
						Item: {
							pk: { S: `ORG#${organization}` },
							sk: { S: `USER#${userEmail}` },
							role: { S: 'ADMIN' }
						}
					}
				},
				{
					PutRequest: {
						Item: {
							pk: { S: `USER#${userEmail}` },
							sk: { S: `ORG#${organization}` },
							role: { S: 'ADMIN' }
						}
					}
				}
			]
		}
	};

	try {
		// @ts-ignore - TS error because item schemas don't match.
		const response = await dbClient.send(new BatchWriteItemCommand(params));
		console.log(response);

		if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
			throw new Error('Some or all of the items were not processed.');
		}

		return response;
	} catch (error) {
		if (error instanceof Error) {
			return fail(400, { unprocessedItems: true, message: error.message });
		}
		return fail(400, {
			unprocessedItems: true,
			message: 'An error occurred while creating your Organization'
		});
	}
}
