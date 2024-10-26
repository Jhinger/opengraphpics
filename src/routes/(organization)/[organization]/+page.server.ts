import { stripe } from '$lib/stripe';
import { redirect, fail } from '@sveltejs/kit';
import { invalidateAll } from '$app/navigation';
import batchCreateRoutes from '$queries/batchCreateRoutes';
import { userPlan } from '$lib/utils';
import { Queue } from '$lib/sqs';
import Sitemapper from 'sitemapper';
import type { SitemapperResponse } from 'sitemapper';
import type { Actions } from './$types';

export const actions: Actions = {
	session: async ({ request, locals, url }) => {
		locals.authorizer.isAuthenticated();

		const form = await request.formData();
		const priceId = form.get('priceId')?.toString();
		const orgStripeId = form.get('orgStripeId')?.toString();

		if (!priceId || !orgStripeId) {
			fail(400, { success: false, message: 'Failed to provide necessary data.' });
		}

		const userIntendedPlan = userPlan(priceId as string);
		if (userIntendedPlan === 'ERROR') {
			fail(400, { success: false, message: 'This Price Id does not exist.' });
		}

		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			customer: orgStripeId,
			metadata: {
				plan: userPlan(priceId as string)
			},
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
	},
	// TODO: Limit number of routes supported based on users plan size.
	setupRoutes: async ({ request, locals, url }) => {
		locals.authorizer.isAuthenticated();

		const form = await request.formData();

		const sitemapUrl = form.get('sitemap-url')?.toString();
		const sitemapContent = form.get('sitemap-content')?.toString();
		const organization = form.get('organization')?.toString();

		if (organization === undefined || !organization) {
			return fail(400, { success: false, message: 'Organization not provided' });
		}

		if (sitemapUrl) {
			console.log('sitemap url provided: ', sitemapUrl);
			const sitemapper = new Sitemapper({
				url: sitemapUrl,
				timeout: 15000,
				requestHeaders: {
					'User-Agent':
						'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0'
				},
				retries: 1
			});

			try {
				const sites: SitemapperResponse = await sitemapper.fetch();
				const queue = new Queue();
				console.log('sites: ', sites);

				for (let i = 0; i < sites.sites.length; i += 25) {
					const batch = sites.sites.slice(i, i + 25);
					await batchCreateRoutes(organization, batch);

					for (const site of batch) {
						queue.sendMessage({
							url: site,
							organization: organization
						});
					}
				}

				await invalidateAll();
			} catch (error) {
				fail(400, { success: false, message: 'Failed to fetch sitemap' });
			}
		} else if (sitemapContent) {
			console.log('sitemap content provided: ', sitemapContent);
		} else {
			fail(400, { success: false, message: 'Sitemap URL / Sitemap Content not provided' });
		}

		return {
			success: true
		};
	}
};
