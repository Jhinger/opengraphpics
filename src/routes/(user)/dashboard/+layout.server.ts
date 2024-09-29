import getUserOrganizations from '$queries/getUserOrganizations';
import batchGetOrganizationMetadata from '$queries/batchGetOrganizationMetadata';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, setHeaders }) => {
	locals.authorizer.isAuthenticated();

	const userOrganizations = await getUserOrganizations(locals?.authorizer?.user?.email);
	const organizationsMetadata = await batchGetOrganizationMetadata(userOrganizations);

	setHeaders({
		'cache-control': 'public,max-age=30,s-maxage=30'
	});

	return {
		organizationsMetadata: organizationsMetadata
	};
};
