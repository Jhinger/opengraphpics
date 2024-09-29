import createOrganization from '$queries/createOrganization';
import { uploadImages } from '$lib/s3';
import { redirect, fail } from '@sveltejs/kit';
import { MAX_FILE_THUMBNAIL_SIZE, MAX_FILE_ICON_SIZE } from '$constants';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		locals.authorizer.isAuthenticated();

		const data = await request.formData();
		console.log(data);

		const org = data.get('organization') as string;
		const domain = data.get('domain') as string;
		const icon = data.get('icon') as File;
		const thumbnail = data.get('thumbnail') as File;

		if (!org || !icon || !thumbnail || !domain) {
			return fail(400, { missing: true, message: 'Missing Organization form attributes' });
		}

		if (icon.size > MAX_FILE_ICON_SIZE) {
			return fail(400, { tooLarge: true, message: 'Icon file size is too large.' });
		}

		if (thumbnail.size > MAX_FILE_THUMBNAIL_SIZE) {
			return fail(400, { tooLarge: true, message: 'Thumbnail file size is too large.' });
		}

		await createOrganization(org, domain, locals.authorizer.user?.email);
		const uploadResponse = uploadImages([
			{
				key: `${org}/icon`,
				file: icon
			},
			{
				key: `${org}/thumbnail`,
				file: thumbnail
			}
		]);

		if (!uploadResponse.success)
			return fail(400, { uploadFailed: true, message: 'Failed to upload some or all assets.' });

		// Invalidate the /dashboard route if redirecting back to the dashboard.
		return redirect(303, `/${org}`);
	}
} satisfies Actions;
