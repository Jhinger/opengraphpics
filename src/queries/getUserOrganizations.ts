import { dbClient } from '$lib/auth';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';

export default async function getUserOrganizations(userEmail?: string) {
	if (!userEmail) return [];

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
		ConsistentRead: false,
		ExpressionAttributeValues: {
			':pk': { S: `USER#${userEmail}` },
			':sk': { S: 'ORG#' }
		}
	};

	try {
		const response = await dbClient.send(new QueryCommand(params));
		console.log(response);

		if (response.Count === 0) return [];

		const items = response.Items;
		const organizations = items!.map((item) => {
			return {
				organization: item!.sk!.S!.split('#')[1],
				role: item?.role?.S
			};
		});

		return organizations;
	} catch (error) {
		console.log('Error getUserOrganizations: ', error);
	}
}
