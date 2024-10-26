import { Resource } from 'sst';
import { dbClient } from '$lib/auth';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';

/***
 * organization: name of the organization.
 * subscription: name of the subscription plan (Entry, Growth, Enterprise)
 * subscriptionId: priceId of the subscription.
 * subscriptionStatus: status of the subscription (paid, past_due).
 ***/

interface UpdateParams {
	TableName: string;
	Key: {
		pk: { S: string };
		sk: { S: string };
	};
	UpdateExpression: string;
	ExpressionAttributeValues: {
		':subscriptionStatus': { S: string };
		':stripeSubscriptionId': { S: string };
		':subscription'?: { S: string };
	};
}

export async function updateOrganizationSubscription(
	organization: string,
	subscriptionId: string,
	subscriptionStatus: string,
	subscription?: string
) {
	const params: UpdateParams = {
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

	if (subscription) {
		params.UpdateExpression += ', subscription = :subscription';
		params.ExpressionAttributeValues[':subscription'] = { S: subscription };
	}

	try {
		await dbClient.send(new UpdateItemCommand(params));
		return true;
	} catch (error) {
		console.log('Error updateOrganizationSubscription: ', error);
		return false;
	}
}
