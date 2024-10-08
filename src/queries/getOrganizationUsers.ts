import { dbClient } from '$lib/auth';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';

export default async function getOrganizationUsers(organization: string | undefined) {
	if (organization === undefined || !organization) return [];

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
		ConsistentRead: false,
		ExpressionAttributeValues: {
			':pk': { S: `ORG#${organization}` },
			':sk': { S: 'USER#' }
		}
	};

	try {
		const response = await dbClient.send(new QueryCommand(params));
		console.log(response);

		const items = response.Items;
		const organizationUsers = items!.map((user) => {
			return {
				userEmail: user!.sk!.S!.split('#')[1],
				role: user!.role!.S!
			};
		});

		return organizationUsers;
	} catch (error) {
		console.log('Error getOrganizationUsers: ', error);
		return [];
	}
}
