<script lang="ts">
	import * as Dialog from '$components/ui/dialog';
	import * as Tabs from '$components/ui/tabs';
	import FacebookIcon from 'virtual:icons/mdi/facebook';
	import LinkedInIcon from 'virtual:icons/mdi/linkedin';
	import TwitterIcon from 'virtual:icons/mdi/twitter';
	import { Button } from '$components/ui/button';
	import CodeBlock from '$components/code-block.svelte';
	import { assetPath } from '$lib/utils';
	import type { OrganizationRoute } from '$types';

	// TODO: Update this component to have hover effect, onClick opens Modal with modifications.
	let { organization, domain, route } = $props<{
		organization: string;
		domain: string;
		route: OrganizationRoute;
	}>();

	let image: HTMLImageElement;
	let imageGenerating = $state(false);

	$effect(() => {
		image.onerror = () => {
			imageGenerating = true;
		};
	});
</script>

<Dialog.Root>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<div
				class="h-[8rem] w-[15rem] overflow-hidden rounded-md bg-gray-200 ring-1 ring-gray-300 duration-100 hover:cursor-pointer hover:ring-2 hover:ring-sky-300"
				{...props}
			>
				{#if imageGenerating}
					<div class="flex h-full w-full items-center justify-center font-medium text-black">
						Generating
					</div>
				{:else}
					<img
						bind:this={image}
						src={assetPath(
							`/assets/${organization}${route.route === '/' ? '/index' : route.route}`
						)}
						alt="Generating"
						class="flex h-full w-full items-center justify-center object-cover"
					/>
				{/if}
			</div>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="w-full">
		<Dialog.Header class="ml-12">
			<Dialog.Title>Route Actions</Dialog.Title>
			<Dialog.Description>{route.route}</Dialog.Description>
		</Dialog.Header>
		<div class="flex h-full flex-row items-end justify-center gap-4">
			<Tabs.Root>
				<Tabs.List>
					<Tabs.Trigger value="linkedin">
						<LinkedInIcon class="h-5 w-5 text-[#0a66c2]" />
					</Tabs.Trigger>
					<Tabs.Trigger value="facebook">
						<FacebookIcon class="h-5 w-5 text-[#1877F2]" />
					</Tabs.Trigger>
					<Tabs.Trigger value="twitter">
						<TwitterIcon class="h-5 w-5 text-[#1DA1F2]" />
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="linkedin">
					<a
						href={`https://${domain}${route.route}`}
						data-sveltekit-reload
						class="flex h-[22.75rem] w-fit max-w-[33rem] flex-col bg-gray-300 ring-2 ring-gray-300 duration-100 hover:ring-gray-400"
					>
						<img
							src={assetPath(
								`/assets/${organization}${route.route === '/' ? '/index' : route.route}`
							)}
							alt=""
							class="pointer-events-none flex h-full w-full items-center justify-center object-cover"
						/>
						<div
							class="flex h-full max-h-[4rem] w-full flex-col items-start justify-center gap-1 px-4 py-1"
						>
							<span class="text-sm font-medium capitalize leading-none"
								>{organization} - Lorem ipsum dolor sit amet</span
							>
							<div
								class="flex flex-row items-center justify-center gap-2 text-xsplus text-gray-500"
							>
								<span class="leading-none">{domain}</span>
								<span> &#x2022; </span>
								<span class="leading-none">1 min read</span>
							</div>
						</div>
					</a>
				</Tabs.Content>
				<Tabs.Content value="facebook">
					<a
						href={`https://${domain}${route.route}`}
						data-sveltekit-reload
						class="flex h-[22.75rem] w-fit max-w-[33rem] flex-col bg-gray-300 ring-2 ring-gray-300 duration-100 hover:ring-gray-400"
					>
						<img
							src={assetPath(
								`/assets/${organization}${route.route === '/' ? '/index' : route.route}`
							)}
							alt=""
							class="pointer-events-none flex h-full w-full items-center justify-center object-cover"
						/>
						<div
							class="flex h-full max-h-[5rem] w-full flex-col items-start justify-center gap-1 px-4 py-1"
						>
							<span class="text-xxs uppercase leading-none text-gray-500">{domain}</span>
							<span class="text-sm font-medium capitalize leading-none"
								>{organization} - Lorem ipsum dolor sit amet</span
							>
							<div
								class="flex flex-row items-center justify-center gap-2 text-xsplus text-gray-500"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</div>
						</div>
					</a>
				</Tabs.Content>
				<Tabs.Content value="twitter">
					<div class="flex h-[22.75rem] w-[33rem] items-center justify-center bg-transparent">
						<a
							href={`https://${domain}${route.route}`}
							data-sveltekit-reload
							class="relative flex h-fit w-[33rem] flex-col rounded-md bg-gray-300 ring-2 ring-gray-300 duration-100 hover:ring-gray-400"
						>
							<img
								src={assetPath(
									`/assets/${organization}${route.route === '/' ? '/index' : route.route}`
								)}
								alt=""
								class="pointer-events-none flex h-full w-full items-center justify-center rounded-md object-cover"
							/>
							<div
								class="absolute bottom-4 left-4 flex flex-row items-center justify-center gap-1 rounded-md bg-gray-700 p-1 capitalize leading-none text-gray-200"
							>
								<span class="rounded-sm text-xs">{organization}</span>
								<span>-</span>
								<span class="rounded-sm text-xs">Lorem ipsum dolor sit amet</span>
							</div>
						</a>
					</div>
				</Tabs.Content>
			</Tabs.Root>
			<div class="h-[22.75rem] w-[30rem] rounded-md bg-gray-300">
				<CodeBlock {organization} route={route.route} {domain} />
			</div>
			<div
				class="flex h-[23rem] w-[15rem] flex-col items-center justify-start gap-2 rounded-md bg-gray-200 p-2"
			>
				<span class="w-full p-2 text-start font-medium text-black">Route Actions</span>
				<Button
					class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-sky-200"
					>Queue</Button
				>
				<Button
					class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-sky-200"
					>Upload</Button
				>
				<Button
					class="flex w-full flex-row gap-2 bg-white text-black duration-100 hover:border-2 hover:border-sky-500 hover:bg-sky-200"
					>Disable</Button
				>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
