import { Authorizer } from '$lib/auth/authorizer';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;

	locals.authorizer = new Authorizer(cookies);

	return await resolve(event);
};
