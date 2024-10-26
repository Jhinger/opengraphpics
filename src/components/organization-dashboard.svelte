<script lang="ts">
	import ChevronRightIcon from 'virtual:icons/mdi/chevron-right';
	import AddIcon from 'virtual:icons/mdi/add';
	import RefreshIcon from 'virtual:icons/mdi/refresh';
	import EyeIcon from 'virtual:icons/mdi/eye-outline';
	import InviteIcon from 'virtual:icons/mdi/invite';
	import MapIcon from 'virtual:icons/mdi/map-marker-path';
	import AccountView from 'virtual:icons/mdi/account-view';
	import AnalyticCard from '$components/analytic-card.svelte';
	import AnalyticChart from '$components/analytic-chart.svelte';
	import OrganizationRecentImage from '$components/organization-recent-image.svelte';
	import SetupRoutes from '$components/setup-routes.svelte';
	import { Button } from '$components/ui/button/';
	import { getContext } from 'svelte';
	import type { OrganizationMetadata, OrganizationPageData } from '$types';

	const { organizationMetadata } = $props<{ organizationMetadata: OrganizationMetadata[] }>();

	const organization = getContext<OrganizationPageData>('organization');
</script>

<main class="flex w-full items-center justify-center">
	{#if !organization.organizationRoutes.length}
		<SetupRoutes />
	{:else}
		<div class="mb-16 flex w-max flex-col">
			<div
				class="my-6 flex flex-row items-center justify-start gap-1 text-sm capitalize text-gray-500"
			>
				<span>{organizationMetadata.organization}</span>
				<ChevronRightIcon class="h-4 w-4" />
				<span>Dashboard</span>
			</div>
			<div class="flex w-max flex-row items-center justify-center gap-6">
				<AnalyticCard
					title="Routes Supported"
					Icon={MapIcon}
					value={organization.organizationRoutes.length}
					subvalue="/500 route plan"
				/>
				<AnalyticCard
					title="Thumbnail Views"
					Icon={AccountView}
					value={(12309).toLocaleString()}
					subvalue="+24% MoM"
				/>
				<AnalyticCard
					title="Routes Supported"
					Icon={MapIcon}
					value="203"
					subvalue="/500 route plan"
				/>
				<AnalyticCard
					title="Routes Supported"
					Icon={MapIcon}
					value="203"
					subvalue="/500 route plan"
				/>
			</div>
			<div class="my-4 flex h-fit flex-row items-stretch justify-center gap-4 rounded-md">
				<div class="flex flex-col items-start justify-center rounded-md bg-gray-200">
					<div class="px-5 py-4 text-lg font-semibold tracking-tight">Recent Images</div>
					<div class="grid w-max grid-cols-3 grid-rows-2 gap-4 px-4 pb-4">
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
						<OrganizationRecentImage>
							<img src="https://picsum.photos/200/300" alt="" class="h-full w-full object-cover" />
						</OrganizationRecentImage>
					</div>
				</div>
				<div
					class="flex flex-grow flex-col items-center justify-start gap-2 rounded-md bg-gray-200 p-4"
				>
					<div class="w-full text-left text-base font-semibold tracking-tight">Quick Actions</div>
					<Button
						class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-white"
					>
						<AddIcon class="h-4 w-4" />
						Add Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-white"
					>
						<RefreshIcon class="h-4 w-4" />
						Update Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-white"
					>
						<EyeIcon class="h-4 w-4" />
						Preview Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-white"
					>
						<InviteIcon class="h-4 w-4" />
						Invite Member
					</Button>
				</div>
			</div>
			<AnalyticChart />
		</div>
	{/if}
</main>
