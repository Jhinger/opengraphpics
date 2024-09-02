import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import { generateState, generateCodeVerifier } from 'oslo/oauth2';
import { redirect } from '@sveltejs/kit';
import { google } from '$lib/auth';
import { Resource } from 'sst';

export function GET({ cookies }: RequestEvent): RequestHandler {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ['profile', 'email']);

	cookies.set('google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		secure: Resource.App.stage === 'production',
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	cookies.set('google_oauth_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		secure: Resource.App.stage === 'production',
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return redirect(307, url.toString());
}
