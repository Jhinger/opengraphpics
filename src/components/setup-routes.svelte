<script lang="ts">
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import { Textarea } from '$components/ui/textarea';
	import { Separator } from '$components/ui/separator';
	import { Button } from '$components/ui/button';
	import LoadingSpinner from '$components/loading-spinner.svelte';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import type { OrganizationPageData } from '$types';

	const organization = getContext<OrganizationPageData>('organization');

	let sitemapUrl = $state('');
	let sitemapContent = $state('');
	let unfilledError = $state(false);

	let isCreating = $state(false);
</script>

<form
	class="h-fit w-[40rem] rounded-md bg-sky-100 p-8 text-sm"
	method="post"
	action="?/setupRoutes"
	use:enhance={({ cancel }) => {
		isCreating = true;
		if (!sitemapUrl && !sitemapContent) {
			unfilledError = true;
			return cancel();
		}
		unfilledError = false;
		return async ({ update }) => {
			isCreating = false;
			await update();
		};
	}}
>
	<input
		type="text"
		name="organization"
		class="hidden"
		value={organization.organizationMetadata.organization}
	/>
	<div class="mb-8 flex flex-col items-start justify-center gap-4 text-gray-700">
		<h1 class="w-full text-left text-2xl font-bold text-black">Getting Started</h1>
		<p>
			Provide a list of URLs you'd like to support by selecting one of the options below. Don't
			worry - you can easily add or remove routes anytime.
		</p>
		<p>
			<span class="font-semibold text-black">Note</span>: If your plan only allows for 100 routes
			and you supply more than 100, we will only use the first 100 (This applies to all plans
			excluding Enterprise customers).
		</p>
		{#if unfilledError}
			<p class="w-full text-center text-red-500">
				Error - Please fill out at least one of the fields.
			</p>
		{/if}
	</div>
	<div class="h-full w-full">
		<div class="flex w-full flex-col items-start justify-center gap-2">
			<!-- TODO: Explain what a sitemap file is. -->
			<Label for="sitemap-url">Sitemap URL:</Label>
			<Input
				type="url"
				id="sitemap-url"
				name="sitemap-url"
				bind:value={sitemapUrl}
				placeholder="https://www.opengraph.pics/sitemap.xml"
			/>
		</div>
	</div>
	<div class="my-4 flex flex-row items-center justify-center gap-4 overflow-hidden">
		<Separator orientation="horizontal" class="h-[1px] bg-gray-400" />
		<span class="font-semibold tracking-tighter text-gray-500">OR</span>
		<Separator orientation="horizontal" class="h-[1px] bg-gray-400" />
	</div>
	<div class="h-fit w-full">
		<div class="flex w-full flex-col items-start justify-center gap-2">
			<Label for="sitemap-content">Sitemap Contents (Copy and Paste):</Label>
			<Textarea
				id="sitemap-content"
				name="sitemap-content"
				class="h-[20rem] w-full"
				bind:value={sitemapContent}
				placeholder={`ex:

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.opengraph.pics/</loc>
    <lastmod>2024-10-18T18:37:55.525Z</lastmod>
  </url>
</urlset>
        `}
			/>
		</div>
	</div>
	<div class="my-4 flex flex-row items-center justify-center gap-4 overflow-hidden">
		<Separator orientation="horizontal" class="h-[1px] bg-gray-400" />
		<span class="font-semibold tracking-tighter text-gray-500">OR</span>
		<Separator orientation="horizontal" class="h-[1px] bg-gray-400" />
	</div>
	<!-- TODO: Add ability to manually specify routes. -->
	<div class="">
		<Button
			type="submit"
			class="w-full bg-sky-500 transition-all duration-150 hover:bg-sky-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 hover:ring-offset-gray-200"
		>
			{#if isCreating}
				<LoadingSpinner />
			{:else}
				Submit
			{/if}
		</Button>
	</div>
</form>
