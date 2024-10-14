import { Resource } from 'sst';
import { error, json } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import type { RequestEvent } from './$types';
import { updateOrganizationSubscription } from '$queries/updateOrganizationSubscription';
import type Stripe from 'stripe';

export async function POST({ request }: RequestEvent) {
	const webhookSecret = Resource.StripeWebhookSecret.value;
	if (!webhookSecret) error(404, 'Missing Stripe Webhook secret');

	let signature = request.headers.get('stripe-signature');
	if (!signature) error(404, 'Missing Stripe signature');

	let data,
		eventType = '';

	try {
		let event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);

		data = event.data;
		eventType = event.type;
	} catch (err) {
		return error(400, 'Webhook signature verification failed');
	}

	switch (eventType) {
		case 'checkout.session.completed': {
			// Payment is successful and the subscription is created.
			// You should provision the subscription and save the customer ID to your database.

			data = data as Stripe.CheckoutSessionCompletedEvent.Data;
			const orgName = data.object.customer_details!.name!;
			const orgSubscriptionId = data.object.subscription as string;

			await updateOrganizationSubscription(orgName, orgSubscriptionId, 'paid');
			break;
		}
		case 'invoice.paid': {
			// Continue to provision the subscription as payments continue to be made.
			// Store the status in your database and check when a user accesses your service.
			// This approach helps you avoid hitting rate limits.

			data = data as Stripe.InvoicePaidEvent.Data;
			const orgName = data.object.customer_name!;
			const subscriptionId = data.object!.subscription! as string;

			await updateOrganizationSubscription(orgName, subscriptionId, 'paid');
			break;
		}
		case 'invoice.payment_failed': {
			// The payment failed or the customer does not have a valid payment method.
			// The subscription becomes past_due. Notify your customer and send them to the
			// customer portal to update their payment information.

			data = data as Stripe.InvoicePaymentFailedEvent.Data;

			const orgName = data.object.customer_name!;
			const subscriptionId = data.object.subscription! as string;

			await updateOrganizationSubscription(orgName, subscriptionId, 'past_due');
			break;
		}
		default:
			break;
	}

	return json({ success: 'true' }, { status: 200 });
}
