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
	import { Input } from '$components/ui/input';
	import { Checkbox } from '$components/ui/checkbox';
	import { Button } from '$components/ui/button/';
	import * as Dialog from '$components/ui/dialog';
	import * as Table from '$components/ui/table';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { assetPath } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { MAX_ROUTES_TO_DISPLAY } from '$constants';
	import type { OrganizationMetadata, OrganizationPageData, OrganizationRoute } from '$types';

	const { organizationMetadata } = $props<{ organizationMetadata: OrganizationMetadata[] }>();

	const organization = getContext<OrganizationPageData>('organization');

	let updateRoute = $state<string>('');
	let filteredUpdateRoutes = $derived<OrganizationRoute[]>(
		organization.organizationRoutes.filter((route) => route.route.includes(updateRoute))
	);

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
			case 'Entry': {
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
					<Dialog.Root>
						<Dialog.Trigger>
							{#snippet child({ props })}
								<Button
									class="flex w-full flex-row gap-2 bg-sky-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-sky-200"
									{...props}
								>
									<AddIcon class="h-4 w-4" />
									Add Route
								</Button>
							{/snippet}
						</Dialog.Trigger>
						<Dialog.Content class="w-[50rem]">
							<Dialog.Header>
								<Dialog.Title>Add Route</Dialog.Title>
								<Dialog.Description class="flex flex-row items-center justify-center gap-2 py-4">
									{#if organization.organizationMetadata.subscription === 'Enterprise'}
										<span class="text-left text-gray-500">
											You are on the Enterprise plan, which includes <strong
												class="font-medium text-black">On Demand Generation</strong
											>. This feature automatically generates thumbnails for new routes as OG image
											requests are received — no action needed on your part.
										</span>
									{:else}
										<span class="text-gray-500">
											Your current plan does not include <strong class="font-medium text-black"
												>On Demand Generation</strong
											>. This means you’ll need to manually add each route to generate an OG image
											for it. Upgrade to the Enterprise plan for automatic OG image generation as
											new requests are recieved for unserved routes.
										</span>
									{/if}
								</Dialog.Description>
							</Dialog.Header>
							<div class="h-fit w-full">
								<div class="flex h-[3rem] flex-row">
									<span
										class="flex h-full flex-1 items-center justify-center rounded-l-md bg-gray-300 px-4 py-2 text-sm"
										>https://{organization.organizationMetadata.domain}/</span
									>
									<Input
										class="h-full min-w-[15rem] rounded-l-none border-2 border-gray-300 ring-gray-300"
									></Input>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Root>
					<Dialog.Root>
						<Dialog.Trigger>
							{#snippet child({ props })}
								<Button
									class="flex w-full flex-row gap-2 bg-gray-200 text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-gray-200"
									{...props}
								>
									<RefreshIcon class="h-4 w-4" />
									Update Route
								</Button>
							{/snippet}
						</Dialog.Trigger>
						<Dialog.Content class="w-[50rem]">
							<Dialog.Header>
								<Dialog.Title>Update Route</Dialog.Title>
								<Dialog.Description
									class="flex w-full flex-row items-center justify-start gap-2 py-2"
								>
									<span class="text-left text-gray-500"> Queue route(s) for regeneration. </span>
								</Dialog.Description>
							</Dialog.Header>
							<form class="flex h-full flex-col items-center justify-center gap-4" method="post">
								<Input
									bind:value={updateRoute}
									class="h-[3rem] w-full rounded-md border-2 border-gray-300 ring-gray-300"
									placeholder="Filter for route(s)..."
								></Input>
								{#if organization.organizationRoutes.length}
									<Table.Root class="my-2 w-full">
										<Table.Header>
											<Table.Row>
												<Table.Head>Selected</Table.Head>
												<Table.Head>Route</Table.Head>
												<Table.Head>Queued</Table.Head>
												<Table.Head>Created At</Table.Head>
												<Table.Head>Updated At</Table.Head>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{#if filteredUpdateRoutes.length}
												{#each filteredUpdateRoutes.slice(0, 6) as route}
													<Table.Row>
														<Table.Cell>
															<Checkbox
																name="routes[]"
																value={route.route}
																disabled={route.queued}
															/>
														</Table.Cell>
														<Table.Cell>{route.route}</Table.Cell>
														<Table.Cell>{route.queued}</Table.Cell>
														<Table.Cell>{route.createdAt.substring(0, 10)}</Table.Cell>
														<Table.Cell>{route.updatedAt.substring(0, 10)}</Table.Cell>
													</Table.Row>
												{/each}
											{:else}
												<div class="flex h-[10rem] w-max items-center justify-center text-gray-500">
													No Routes to Update.
												</div>
											{/if}
										</Table.Body>
									</Table.Root>
									<Button
										type="submit"
										class="w-full bg-sky-400 font-normal duration-150 hover:bg-sky-500"
									>
										Queue Selected
									</Button>
								{:else}
									<div class="flex h-[10rem] w-full items-center justify-center text-gray-500">
										No Routes to Update.
									</div>
								{/if}
							</form>
						</Dialog.Content>
					</Dialog.Root>
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
