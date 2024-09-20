<script lang="ts">
	import NotoRat from 'virtual:icons/noto-v1/rat';
	import OrganizationCard from '$components/organization-card.svelte';
	import { Separator } from '$components/ui/separator';
	import CreateOrganizationModal from '$components/create-organization-modal.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<div class="flex justify-center items-center">
	<div class="flex flex-col justify-center items-center w-[55rem] mt-16 mb-32">
		<div class="flex justify-between items-end w-full py-2">
			<h1 class="text-lg font-black px-4">Organizations</h1>
			<CreateOrganizationModal />
		</div>
		<Separator orientation="horizontal" class="h-[0.1rem]" />
		<div
			class="flex flex-row gap-4 justify-start items-center w-full h-[13rem] mt-5 bg-gray-200 rounded-md p-4"
		>
			<OrganizationCard />
			<OrganizationCard />
		</div>
		<div class="w-full py-2">
			<h1 class="text-lg font-black px-4 mt-4">Invitations</h1>
		</div>
		<Separator orientation="horizontal" class="h-[0.1rem]" />
		<div
			class="flex flex-col justify-center items-center w-full h-[13rem] mt-5 bg-gray-200 rounded-md gap-2"
		>
			<NotoRat class="w-16 h-16" />
			<span class="font-bold text-black/30 text-sm">No pending invitations.</span>
		</div>
	</div>
</div>
