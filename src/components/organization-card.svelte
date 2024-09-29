<script lang="ts">
	import * as Avatar from '$components/ui/avatar';
	import { Badge } from '$components/ui/badge';
	import { cn } from '$lib/utils.js';
	import { assetPath } from '$lib/utils.js';
	import type { OrganizationMetadata } from '$types';

	const { organization, className } = $props<{
		organization: OrganizationMetadata;
		className?: string;
	}>();
</script>

<div
	class={cn(
		'relative flex flex-col h-full w-[15rem] bg-white rounded-md hover:cursor-pointer hover:ring-2 hover:ring-slate-400 duration-150',
		className
	)}
>
	<Avatar.Root
		class="absolute top-1/2 bg-white left-5 transform -translate-y-1/2 ring-2 ring-white ring-offset-white z-10"
	>
		<Avatar.Image
			src={assetPath(`/assets/${organization.organization}/icon`)}
			alt=""
			draggable={false}
		></Avatar.Image>
		<Avatar.Fallback class="bg-gray-200"></Avatar.Fallback>
	</Avatar.Root>
	<div class="relative w-full h-full rounded-t-md overflow-hidden">
		<div class="absolute right-4 top-3 flex flex-col justify-center items-center z-10">
			<span class="text-sm text-white">{organization.organization}</span>
			<span class="text-xxs text-gray-400">{organization.numMembers} Member(s)</span>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black opacity-90"
		></div>
		<img
			src={assetPath(`/assets/${organization.organization}/thumbnail`)}
			alt=""
			class="w-full h-full object-cover rounded-t-md"
		/>
	</div>
	<div class="flex flex-row justify-between items-end w-full h-full">
		<Badge
			variant="secondary"
			class="m-4 text-xxs text-black bg-gray-200 hover:bg-gray-300 rounded-md capitalize"
			>{organization.role.toLowerCase()}</Badge
		>
		<span class="m-4 text-gray-400 font-medium text-xs">{organization.plan}</span>
	</div>
</div>
