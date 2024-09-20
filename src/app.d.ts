import { Authorizer } from '$lib/auth/authorizer';
import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authorizer: Authorizer;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
