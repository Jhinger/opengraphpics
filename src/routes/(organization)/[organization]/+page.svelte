<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { getContext } from 'svelte';
	import PlanSelector from '$components/plan-selector.svelte';
	import OrganizationDashboard from '$components/organization-dashboard.svelte';
	import type { ActionData } from './$types';
	import type { OrganizationPageData } from '$types';
	import { page } from '$app/stores';

	const { form } = $props<{ form: ActionData }>();

	$effect(() => {
		if (form?.success === false) {
			toast.error(form.message);
		}
	});

	console.log($page.data);
	console.log('params: ', $page.url.searchParams.get('url'));

	const organization = getContext<OrganizationPageData>('organization');

	//TODO: If bill is past due, still show the dashboard page, however show some kind of banner.
</script>

<div class="h-full w-full">
	{#if organization.organizationMetadata.subscriptionStatus === 'paid'}
		<OrganizationDashboard organizationMetadata={$page.data.organizationMetadata} />
	{:else if organization.organizationMetadata.subscriptionStatus === 'draft'}
		<PlanSelector />
	{/if}
</div>
