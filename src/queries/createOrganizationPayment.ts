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
		UpdateExpression:
			'SET subscriptionStatus = :subscriptionStatus, stripeCustomerId = :stripeCustomerId, subscription = :subscription',
		ExpressionAttributeValues: {
			':subscriptionStatus': { S: 'draft' },
			':stripeCustomerId': { S: stripeCustomerId },
			':subscription': { S: 'NO PLAN' }
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
