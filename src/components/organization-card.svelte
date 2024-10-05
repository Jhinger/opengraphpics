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

<a
	href={`/${organization.organization}`}
	class={cn(
		'relative flex h-full w-[15rem] flex-col rounded-md bg-white duration-150 hover:cursor-pointer hover:ring-2 hover:ring-slate-400',
		className
	)}
>
	<Avatar.Root
		class="absolute left-5 top-1/2 z-10 -translate-y-1/2 transform bg-white ring-2 ring-white ring-offset-white"
	>
		<Avatar.Image
			src={assetPath(`/assets/${organization.organization}/icon`)}
			alt=""
			draggable={false}
			fetchpriority="high"
		></Avatar.Image>
		<Avatar.Fallback class="bg-gray-200"></Avatar.Fallback>
	</Avatar.Root>
	<div class="relative h-full w-full overflow-hidden rounded-t-md">
		<div class="absolute right-4 top-3 z-10 flex flex-col items-center justify-center">
			<span class="text-sm text-white">{organization.organization}</span>
			<span class="text-xxs text-gray-400">{organization.numMembers} Member(s)</span>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black opacity-90"
		></div>
		<img
			src={assetPath(`/assets/${organization.organization}/thumbnail`)}
			alt=""
			class="h-full w-full rounded-t-md object-cover"
			fetchpriority="high"
		/>
	</div>
	<div class="flex h-full w-full flex-row items-end justify-between">
		<Badge
			variant="secondary"
			class="m-4 rounded-md bg-gray-200 text-xxs capitalize text-black hover:bg-gray-300"
			>{organization.role.toLowerCase()}</Badge
		>
		<span class="m-4 text-xs font-medium text-gray-400">{organization.subscription}</span>
	</div>
</a>
