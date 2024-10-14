import { Resource } from 'sst';
import { dbClient } from '$lib/auth';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';

export async function updateOrganizationSubscription(
	organization: string,
	subscriptionId: string,
	subscriptionStatus: string
) {
	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		Key: {
			pk: { S: `ORG#${organization}` },
			sk: { S: `METADATA` }
		},
		UpdateExpression:
			'SET subscriptionStatus = :subscriptionStatus, stripeSubscriptionId = :stripeSubscriptionId',
		ExpressionAttributeValues: {
			':subscriptionStatus': { S: subscriptionStatus },
			':stripeSubscriptionId': { S: subscriptionId }
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
