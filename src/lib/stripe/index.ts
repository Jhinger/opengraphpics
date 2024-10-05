import Stripe from 'stripe';
import { Resource } from 'sst';

export const stripe = new Stripe(Resource.StripeSecret.value);
