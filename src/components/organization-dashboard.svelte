<script lang="ts">
	import ChevronRightIcon from 'virtual:icons/mdi/chevron-right';
	import AddIcon from 'virtual:icons/mdi/add';
	import RefreshIcon from 'virtual:icons/mdi/refresh';
	import EyeIcon from 'virtual:icons/mdi/eye-outline';
	import InviteIcon from 'virtual:icons/mdi/invite';
	import RegenerationIcon from 'virtual:icons/mdi/regeneration';
	import MapIcon from 'virtual:icons/mdi/map-marker-path';
	import AccountView from 'virtual:icons/mdi/account-view';
	import AnalyticCard from '$components/analytic-card.svelte';
	import AnalyticChart from '$components/analytic-chart.svelte';
	import OrganizationRecentImage from '$components/organization-recent-image.svelte';
	import SetupRoutes from '$components/setup-routes.svelte';
	import Ping from '$components/ping.svelte';
	import { Button } from '$components/ui/button/';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { assetPath } from '$lib/utils';
	import { MAX_ROUTES_TO_DISPLAY } from '$constants';
	import type { OrganizationMetadata, OrganizationPageData } from '$types';

	const { organizationMetadata } = $props<{ organizationMetadata: OrganizationMetadata[] }>();

	const organization = getContext<OrganizationPageData>('organization');

	$effect(() => {
		if (organization.organizationMetadata.subscriptionStatus === 'past_due') {
			toast.warning(
				'Your subscription is past due. Please alert an admin user to update the subscription.'
			);
		}
	});

	function maxRoutesAllowed() {
		switch (organization.organizationMetadata.subscription) {
			case 'NO PLAN': {
				return 10;
			}
			case 'ENTRY': {
				return 100;
			}
			case 'Growth': {
				return 500;
			}
			case 'Enterprise': {
				return 'Infinity';
			}
		}
	}

	function numQueued() {
		return organization.organizationRoutes.filter((route) => route.queued).length;
	}

	function validOrganizationRoutes() {
		let valid = [];
		let counter = 0;

		for (let i = 0; i < organization.organizationRoutes.length; i++) {
			if (!organization.organizationRoutes[i].route.includes('.')) {
				valid.push(organization.organizationRoutes[i]);
				counter += 1;
			}
			if (counter === MAX_ROUTES_TO_DISPLAY) break;
		}
		return valid;
	}
</script>

<main class="flex w-full items-center justify-center">
	{#if !organization.organizationRoutes.length}
		<SetupRoutes />
	{:else}
		<div class="mb-16 flex w-max flex-col">
			<div
				class="my-6 flex flex-row items-center justify-start gap-1 text-sm capitalize text-gray-600"
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
					subvalue={`/${maxRoutesAllowed()} route plan`}
				/>
				<AnalyticCard
					title="Thumbnail Views"
					Icon={AccountView}
					value={(12309).toLocaleString()}
					subvalue={`in ${new Date().toLocaleString('en-US', { month: 'long' })} (+24% MoM)`}
				/>
				<AnalyticCard
					title="Generating"
					Icon={RegenerationIcon}
					value={numQueued()}
					subvalue="queued routes"
				/>
				<AnalyticCard
					title="Routes Supported"
					Icon={MapIcon}
					value="203"
					subvalue="/500 route plan"
				/>
			</div>
			<div class="my-4 flex h-fit flex-row items-stretch justify-center gap-4 rounded-md">
				<div
					class="flex flex-col items-start justify-center rounded-md bg-white ring-1 ring-gray-300"
				>
					<div class="flex w-full items-center justify-between px-5 py-4">
						<div class="text-lg font-semibold tracking-tight">Recent Images</div>
						{#if numQueued()}
							<div class="flex items-center justify-center gap-1">
								<Ping />
								<span class="text-xsplus font-medium">Generating</span>
							</div>
						{/if}
					</div>
					<!-- TODO: UI that showcases something else while images are being generated. -->
					<!-- TODO: sort by most recently updated and then filter. -->
					<div class="grid w-max grid-cols-3 grid-rows-2 gap-4 px-4 pb-4">
						{#each validOrganizationRoutes() as route}
							<OrganizationRecentImage
								organization={organization.organizationMetadata.organization}
								domain={organization.organizationMetadata.domain}
								{route}
							/>
						{/each}
					</div>
				</div>
				<div
					class="flex flex-grow flex-col items-center justify-start gap-2 rounded-md bg-white p-4 ring-1 ring-gray-300"
				>
					<div class="w-full text-left text-base font-semibold tracking-tight">Quick Actions</div>
					<Button
						class="flex w-full flex-row gap-2 bg-sky-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-sky-200"
					>
						<AddIcon class="h-4 w-4" />
						Add Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-gray-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-gray-200"
					>
						<RefreshIcon class="h-4 w-4" />
						Update Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-gray-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-gray-200"
					>
						<EyeIcon class="h-4 w-4" />
						Preview Route
					</Button>
					<Button
						class="flex w-full flex-row gap-2 bg-gray-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-gray-200"
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
