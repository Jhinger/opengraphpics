import { generateRandomString, alphabet } from 'oslo/crypto';
import { Google } from 'arctic';
import { Resource } from 'sst';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const google = new Google(
	Resource.GoogleClientId.value,
	Resource.GoogleClientSecret.value,
	'http://localhost:5173/oauth/google/callback'
);

export const dbClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-2' }));

export function generateId(length: number): string {
	return generateRandomString(length, alphabet('0-9', 'a-z'));
}
