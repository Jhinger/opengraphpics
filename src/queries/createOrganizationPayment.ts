import { dbClient } from '$lib/auth';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { Resource } from 'sst';

export default async function createOrganizationPayment(
	organization: string,
	stripeCustomerId: string
) {
	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		Key: {
			pk: { S: `ORG#${organization}` },
			sk: { S: `METADATA` }
		},
		UpdateExpression: 'SET subscription = :subscription, stripeCustomerId = :stripeCustomerId',
		ExpressionAttributeValues: {
			':subscription': { S: 'FREE' },
			':stripeCustomerId': { S: stripeCustomerId }
		}
	};

	try {
		await dbClient.send(new UpdateItemCommand(params));
		return true;
	} catch (error) {
		console.log('Error createOrganizationPayment: ', error);
		return false;
	}
}
