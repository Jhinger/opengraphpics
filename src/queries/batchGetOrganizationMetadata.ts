import { dbClient } from '$lib/auth';
import { BatchGetItemCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';
import type { UserOrganization, OrganizationMetadata } from '$types';

export default async function batchGetOrganizationMetadata(
	userOrganizations: UserOrganization[] | undefined
) {
	if (userOrganizations === undefined || !userOrganizations.length) return [];

	let lookup: Record<string, UserOrganization> = {};
	const keys = userOrganizations.map((org) => {
		lookup[org.organization] = org;
		return {
			pk: { S: `ORG#${org.organization}` },
			sk: { S: 'METADATA' }
		};
	});

	const params = {
		RequestItems: {
			[Resource.OpenGraphPicsDB.name]: {
				Keys: keys,
				ConsistentRead: false
			}
		}
	};

	try {
		const response = await dbClient.send(new BatchGetItemCommand(params));
		const organizationMetadata: OrganizationMetadata[] = response.Responses![
			Resource.OpenGraphPicsDB.name
		].map((metadata) => {
			return {
				...lookup[metadata!.pk!.S!.split('#')[1]],
				numMembers: metadata.numMembers!.N!,
				subscription: metadata.subscription!.S!
			};
		});

		return organizationMetadata;
	} catch (error) {
		console.log('Error batchGetOrganizationMetadata: ', error);
	}
}
