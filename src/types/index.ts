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
	icon: string;
	banner: string;
	numMembers: number;
	subscription: string;
};

export type UserOrganization = {
	organization: string;
	role: string | undefined;
};

export type OrganizationMetadata = UserOrganization & {
	numMembers: string;
	subscription: string;
};

export type Maybe<T> = T | null;
