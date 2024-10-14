<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';
	import PlanSelector from '$components/plan-selector.svelte';
	import { getContext } from 'svelte';
	import type { OrganizationPageData } from '$types';

	const { form } = $props<{ form: ActionData }>();

	$effect(() => {
		if (form?.success === false) {
			toast.error(form.message);
		}
	});

	const organization = getContext<OrganizationPageData>('organization');

	//TODO: If bill is past due, still show the dashboard page, however show some kind of banner.
</script>

<div class="h-full w-full">
	{#if organization.organizationMetadata.subscriptionStatus === 'paid'}
		<div>Hello is paid.</div>
	{:else if organization.organizationMetadata.subscriptionStatus === 'draft'}
		<PlanSelector />
	{/if}
</div>
