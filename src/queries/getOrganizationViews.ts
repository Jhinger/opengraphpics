import { dbClient } from '$lib/auth';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import type { OrganizationViews } from '$types';

export default async function getOrganizationViews(
	organization: string | undefined
): Promise<OrganizationViews[]> {
	if (organization === undefined || !organization) return [];

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
		ConsistentRead: false,
		ExpressionAttributeValues: {
			':pk': { S: `ORG#${organization}` },
			':sk': { S: 'VIEWS#' }
		},
		ScanIndexForward: false,
		Limit: 10
	};

	try {
		const response = await dbClient.send(new QueryCommand(params));
		console.log(response);

		if (response.Count === 0) return [];

		const items = response.Items;
		const monthlyViews = items!.map((month) => {
			return {
				date: month!.sk!.S!.split('#')[1],
				views: month!.views!.N!
			};
		});

		return monthlyViews;
	} catch (error) {
		console.log('Error getOrganizationViews: ', error);
		return [];
	}
}
