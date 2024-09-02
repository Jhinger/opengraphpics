import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
// import { generateState, generateCodeVerifier } from 'oslo/oauth2';
import { redirect } from '@sveltejs/kit';
// import { google } from '$lib/auth';
// import { Resource } from 'sst';

export function GET({ params }: RequestEvent): RequestHandler {
	console.log(params);

	return redirect(307, '/');
}
