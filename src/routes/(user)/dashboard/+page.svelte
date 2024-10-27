<script lang="ts">
	import NotoRat from 'virtual:icons/noto-v1/rat';
	import OrganizationCard from '$components/organization-card.svelte';
	import { Separator } from '$components/ui/separator';
	import CreateOrganizationModal from '$components/create-organization-modal.svelte';
	import type { PageData, ActionData } from './$types';
	import { toast } from 'svelte-sonner';

	const { data, form } = $props<{ data: PageData; form: ActionData }>();

	$effect(() => {
		if (form?.success) {
			toast.success('Organization has been created.', { description: form?.message });
		} else if (form?.tooLarge) {
			toast.error('Failed to create organization.', { description: form?.message });
		} else if (form?.missing) {
			toast.error('Failed to create organization', { description: form?.message });
		} else if (form?.unprocessedItems) {
			toast.error('Failed to create organization', { description: form?.message });
		}
	});
</script>

<div class="flex items-center justify-center">
	<div class="mb-32 mt-16 flex w-[55rem] flex-col items-center justify-center">
		<div class="flex w-full items-end justify-between py-2">
			<h1 class="px-4 text-lg font-semibold">Organizations</h1>
			<CreateOrganizationModal />
		</div>
		<Separator orientation="horizontal" class="h-[0.1rem]" />
		<div
			class="mt-5 flex h-[13rem] w-full flex-row items-center justify-start gap-4 rounded-md bg-gray-200 p-4"
		>
			{#each data?.organizationsMetadata as organization}
				<OrganizationCard {organization} />
			{:else}
				<span>No Organizations</span>
			{/each}
		</div>
		<div class="w-full py-2">
			<h1 class="mt-4 px-4 text-lg font-semibold">Invitations</h1>
		</div>
		<Separator orientation="horizontal" class="h-[0.1rem]" />
		<div
			class="mt-5 flex h-[13rem] w-full flex-col items-center justify-center gap-2 rounded-md bg-gray-200"
		>
			<NotoRat class="h-16 w-16" />
			<span class="text-sm font-semibold text-black/30">No pending invitations.</span>
		</div>
	</div>
</div>
