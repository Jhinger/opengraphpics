import { Authorizer } from '$lib/auth/authorizer';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;

	locals.authorizer = new Authorizer(cookies);

	const response = await resolve(event);
	// response.headers.set('cache-control', 'no-cache');
	return response;
};
