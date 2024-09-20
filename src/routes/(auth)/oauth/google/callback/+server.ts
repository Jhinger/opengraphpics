import { redirect } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';
import { google } from '$lib/auth';
import { dbClient } from '$lib/auth';
import { OAuth2RequestError, ArcticFetchError } from 'arctic';
import { Resource } from 'sst';
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import type { GoogleUser } from '$types';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get('code');
	const codeVerifier = cookies.get('google_oauth_code_verifier') ?? null;
	const state = url.searchParams.get('state');
	const storedState = cookies.get('google_oauth_state') ?? null;

	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
		return redirect(307, '/');
	}

	let tokens, accessToken;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
		accessToken = tokens.accessToken();
	} catch (error) {
		if (error instanceof OAuth2RequestError) {
			console.error(`OAuth2 Request Error: ${error.message}`);
		} else if (error instanceof ArcticFetchError) {
			console.error(`Arctic Fetch Error: ${error.message}`);
		} else {
			console.error(`Unknown Error: ${JSON.stringify(error, null, 2)}`);
		}
		return redirect(307, '/');
	}

	const googleUser = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const user: GoogleUser = await googleUser.json();

	const res = await dbClient.send(
		new GetItemCommand({
			TableName: Resource.OpenGraphPicsDB.name,
			Key: {
				pk: { S: `USER#${user.email}` },
				sk: { S: 'METADATA' }
			}
		})
	);

	// TODO: Check if user is invite-created, in which case we still need to update their information in DB.
	if (res.Item) {
		const token = jsonwebtoken.sign(
			{
				email: user.email,
				name: user.name,
				picture: user.picture
			},
			Resource.JwtSecret.value,
			{ algorithm: 'HS256' }
		);

		cookies.set('user_token', token, {
			secure: Resource.App.stage === 'production',
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		// TODO: Might need to re-initialize the Authorizer here. (Might not as hooks.server.js runs on every request)

		redirect(307, '/dashboard');
	}

	const createUserResponse = await dbClient.send(
		new PutItemCommand({
			TableName: Resource.OpenGraphPicsDB.name,
			Item: {
				pk: { S: `USER#${user.email}` },
				sk: { S: 'METADATA' }
			}
		})
	);

	if (createUserResponse.$metadata.httpStatusCode !== 200) {
		return redirect(307, '/');
	}

	const token = jsonwebtoken.sign(
		{
			email: user.email,
			name: user.name,
			picture: user.picture
		},
		Resource.JwtSecret.value,
		{ algorithm: 'HS256' }
	);

	cookies.set('user_token', token, {
		secure: Resource.App.stage === 'production',
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7
	});

	return redirect(307, '/dashboard');
}
