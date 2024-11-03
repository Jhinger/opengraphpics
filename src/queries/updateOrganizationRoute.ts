import { Resource } from 'sst';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// NOTE: Reimplementing client here because otherwise lamdba bundles everything in auth.ts including unlinked Resources (Google).
const dbClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-2' }));

export default async function updateOrganizationRoute(
	organization: string,
	route: string,
	queued: boolean
) {
	const params = {
		TableName: Resource.OpenGraphPicsDB.name,
		Key: {
			pk: { S: `ORG#${organization}` },
			sk: { S: `ROUTE#${route}` }
		},
		UpdateExpression: 'SET queued = :queued, updatedAt = :updatedAt',
		ExpressionAttributeValues: {
			':queued': { BOOL: queued },
			':updatedAt': { S: new Date().toISOString() }
		}
	};

	try {
		await dbClient.send(new UpdateItemCommand(params));
		return true;
	} catch (error) {
		console.log('Error updateOrganizationRoute: ', error);
		return false;
	}
}
