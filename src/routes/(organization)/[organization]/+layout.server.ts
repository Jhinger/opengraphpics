import { error } from '@sveltejs/kit';
import getUserOrganizations from '$queries/getUserOrganizations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	locals.authorizer.isAuthenticated();

	const userOrganizations = await getUserOrganizations(locals.authorizer.user?.email);
	if (!userOrganizations || !userOrganizations.length)
		return error(
			404,
			`Error fetching User Organizations - Try refreshing if you are sure that you belong to ${params.organization}`
		);

	// TODO: check if the user even belongs to the organization.
	locals.authorizer.belongsToOrganization(params.organization, userOrganizations);

	// TODO: check if the organization actually exists - can be done while fetching metadata for example.
	// TODO: Fetch all of the organizations information, store in context in layout.svelte
	// Members, Invitations?
	// Metadata (stripe plan, domain)
	// Routes Served
	// Image Views over the last 10 months (10 items)
	// Maybe Recent Images added?
};
