import { redirect, error } from '@sveltejs/kit';
import getUserOrganizations from '$queries/getUserOrganizations';
import getOrganizationMetadata from '$queries/getOrganizationMetadata';
import getOrganizationInvitations from '$queries/getOrganizationInvitations';
import getOrganizationUsers from '$queries/getOrganizationUsers';
import getOrganizationRoutes from '$queries/getOrganizationRoutes';
import getOrganizationViews from '$queries/getOrganizationViews';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	locals.authorizer.isAuthenticated();

	const organizationMetadata = await getOrganizationMetadata(params.organization);
	if (!organizationMetadata) redirect(307, '/dashboard');

	const userOrganizations = await getUserOrganizations(locals.authorizer.user?.email);
	if (!userOrganizations || !userOrganizations.length)
		return error(
			404,
			`Error fetching User Organizations - Try refreshing if you are sure that you belong to ${params.organization}`
		);

	locals.authorizer.belongsToOrganization(params.organization, userOrganizations);

	const [organizationInvitations, organizationUsers, organizationRoutes, organizationViews] =
		await Promise.all([
			getOrganizationInvitations(params.organization),
			getOrganizationUsers(params.organization),
			getOrganizationRoutes(params.organization),
			getOrganizationViews(params.organization)
		]);

	return {
		userOrganizations: userOrganizations,
		organizationMetadata: organizationMetadata,
		organizationInvitations: organizationInvitations,
		organizationUsers: organizationUsers,
		organizationRoutes: organizationRoutes,
		organizationViews: organizationViews
	};
};
