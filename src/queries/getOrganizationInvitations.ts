import { dbClient } from '$lib/auth';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import type { OrganizationInvitation } from '$types';

export default async function getOrganizationInvitations(
	organization: string | undefined
): Promise<OrganizationInvitation[]> {
	if (organization === undefined || !organization) return [];

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
		ConsistentRead: false,
		ExpressionAttributeValues: {
			':pk': { S: `ORG#${organization}` },
			':sk': { S: 'INVITATION#' }
		}
	};

	try {
		const response = await dbClient.send(new QueryCommand(params));
		console.log(response);

		if (response.Count === 0) return [];

		const items = response.Items;
		const invitedUsers = items!.map((user) => {
			return {
				userEmail: user!.sk!.S!.split('#')[1],
				invitedAt: user!.invitedAt!.S!
			};
		});

		return invitedUsers;
	} catch (error) {
		console.log('Error getOrganizationInvitations: ', error);
		return [];
	}
}
