import type { OrganizationPageData } from '$types';

export default function createOrganizationContext(o: OrganizationPageData) {
	const organization = $state({
		organizationInvitations: o.organizationInvitations,
		organizationMetadata: o.organizationMetadata,
		organizationRoutes: o.organizationRoutes,
		organizationUsers: o.organizationUsers,
		organizationViews: o.organizationViews
	});

	return {
		get organizationInvitations() {
			return organization.organizationInvitations;
		},
		get organizationMetadata() {
			return organization.organizationMetadata;
		},
		get organizationRoutes() {
			return organization.organizationRoutes;
		},
		get organizationUsers() {
			return organization.organizationUsers;
		},
		get organizationViews() {
			return organization.organizationViews;
		}
	};
}
