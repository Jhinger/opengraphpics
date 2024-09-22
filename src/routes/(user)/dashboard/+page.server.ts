import type { Actions } from './$types';
import { MAX_FILE_THUMBNAIL_SIZE, MAX_FILE_ICON_SIZE } from '$constants';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		locals.authorizer.isAuthenticated();

		const data = await request.formData();
		console.log(data);

		const org = data.get('organization');
		const icon = data.get('icon') as File;
		const thumbnail = data.get('thumbnail') as File;

		if (icon.size > MAX_FILE_ICON_SIZE) {
			return { success: false, message: 'Icon is too large' };
		}

		if (thumbnail.size > MAX_FILE_THUMBNAIL_SIZE) {
			return { success: false, message: 'Thumbnail is too large' };
		}

		return { success: true };
	}
};
