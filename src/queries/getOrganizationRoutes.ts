import { dbClient } from '$lib/auth';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import type { OrganizationRoute } from '$types';

export default async function getOrganizationRoutes(
	organization: string | undefined
): Promise<OrganizationRoute[]> {
	if (organization === undefined || !organization) return [];

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
		ConsistentRead: false,
		ExpressionAttributeValues: {
			':pk': { S: `ORG#${organization}` },
			':sk': { S: 'ROUTE#' }
		}
	};

	try {
		const response = await dbClient.send(new QueryCommand(params));
		console.log(response);

		if (response.Count === 0) return [];

		const items = response.Items;
		const organizationRoutes = items!.map((route) => {
			return {
				route: route!.sk!.S!.split('#')[1]
			};
		});

		return organizationRoutes;
	} catch (error) {
		console.log('Error getOrganizationRoutes: ', error);
		return [];
	}
}
