import { redirect, error } from '@sveltejs/kit';
import getUserOrganizations from '$queries/getUserOrganizations';
import getOrganizationMetadata from '$queries/getOrganizationMetadata';
import getOrganizationInvitations from '$queries/getOrganizationInvitations';
import getOrganizationUsers from '$queries/getOrganizationUsers';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	locals.authorizer.isAuthenticated();

	// TODO: check if the organization actually exists - can be done while fetching metadata for example.
	const organizationMetadata = await getOrganizationMetadata(params.organization);
	if (!organizationMetadata) redirect(307, '/dashboard');

	console.log(organizationMetadata);

	const userOrganizations = await getUserOrganizations(locals.authorizer.user?.email);
	if (!userOrganizations || !userOrganizations.length)
		return error(
			404,
			`Error fetching User Organizations - Try refreshing if you are sure that you belong to ${params.organization}`
		);

	// TODO: check if the user even belongs to the organization.
	locals.authorizer.belongsToOrganization(params.organization, userOrganizations);

	// TODO: Fetch all of the organizations information, store in context in layout.svelte
	// Members, Invitations?
	const [organizationInvitations, organizationUsers] = await Promise.all([
		getOrganizationInvitations(params.organization),
		getOrganizationUsers(params.organization)
	]);

	// Routes Served
	// Image Views over the last 10 months (10 items)
	// Maybe Recent Images added - can just display these from the routes data.

	return {
		userOrganizations: userOrganizations,
		organizationMetadata: organizationMetadata,
		organizationInvitations: organizationInvitations,
		organizationUsers: organizationUsers
	};
};
