import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	locals.authorizer.isAuthenticated();

	// TODO: check if the organization actually exists.
};
