import { generateRandomString, alphabet } from 'oslo/crypto';
import { Google } from 'arctic';
import { Resource } from 'sst';

export const google = new Google(
	Resource.GoogleClientId.value,
	Resource.GoogleClientSecret.value,
	'http://localhost:5173/oauth/google/callback'
);

export function generateId(length: number): string {
	return generateRandomString(length, alphabet('0-9', 'a-z'));
}
