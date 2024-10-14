import { stripe } from '$lib/stripe';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	session: async ({ request, locals, url }) => {
		locals.authorizer.isAuthenticated();

		const form = await request.formData();
		const priceId = form.get('priceId')?.toString();
		const orgEmail = form.get('orgEmail')?.toString();
		const orgStripeId = form.get('orgStripeId')?.toString();

		console.log(priceId, orgEmail, orgStripeId);

		if (!priceId || !orgEmail || !orgStripeId) {
			fail(400, { success: false, message: 'Failed to provide necessary data.' });
		}

		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			customer: orgStripeId,
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: url.origin + '/dashboard',
			cancel_url: url.origin + '/'
		});

		return redirect(303, session.url!);
	}
};
