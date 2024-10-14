import { dbClient } from '$lib/auth';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import type { OrganizationMetadata } from '$types';

export default async function getOrganizationMetadata(organization: string) {
	const key = {
		pk: { S: `ORG#${organization}` },
		sk: { S: 'METADATA' }
	};

	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		Key: key
	};

	try {
		const response = await dbClient.send(new GetItemCommand(params));
		if (!response.Item) return null;

		const metadata = response.Item;
		return {
			organization: organization,
			numMembers: metadata.numMembers?.N,
			stripeCustomerId: metadata.stripeCustomerId?.S,
			stripeSubscriptionId: metadata?.stripeSubscriptionId?.S ?? '',
			subscriptionStatus: metadata.subscriptionStatus?.S,
			domain: metadata.domain?.S
		} as OrganizationMetadata;
	} catch (error) {
		console.log('Error getOrganizationMetadata: ', error);
		return null;
	}
}
