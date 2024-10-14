export type GoogleUser = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
};

export type User = {
	email: string;
	name: string;
	picture: string;
	organizations: string[];
};

export type Organization = {
	name: string;
	numMembers: number;
	subscriptionStatus: string;
	stripeSubscriptionId: string;
};

export type OrganizationPageData = {
	organizationInvitations: Array<OrganizationInvitation>;
	organizationMetadata: OrganizationMetadata;
	organizationRoutes: Array<OrganizationRoute>;
	organizationUsers: Array<{ role: string; userEmail: string }>;
	organizationViews: Array<OrganizationViews>;
};

export type UserOrganization = {
	organization: string;
	role: string | undefined;
};

export type OrganizationMetadata = UserOrganization & {
	numMembers: string;
	subscriptionStatus: string;
	stripeSubscriptionId: string;
	stripeCustomerId?: string;
	domain: string;
};

export type OrganizationInvitation = {
	userEmail: string;
	invitedAt: string;
};

export type OrganizationRoute = {
	route: string;
};

export type OrganizationViews = {
	date: string;
	views: string;
};

export type Maybe<T> = T | null;
