<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import { Button } from '$components/ui/button';
	import CheckIcon from 'virtual:icons/mdi/check';
	import { getContext } from 'svelte';
	import type { User, OrganizationPageData } from '$types';

	let { planName, planPrice, planFeatures, priceId, isPopular } = $props<{
		planName: string;
		planPrice: number;
		planFeatures: string[];
		priceId: string;
		isPopular?: boolean;
	}>();

	const organization = getContext<OrganizationPageData>('organization');
	const user = getContext<User>('user');
	console.log(organization);
</script>

<div
	class="flex h-[30rem] w-[20rem] flex-col justify-start rounded-md bg-sky-200 p-8 duration-150 hover:cursor-pointer hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 hover:ring-offset-white"
>
	<span class="mb-1 text-lg font-semibold"> {planName} </span>
	<span class="text-3xl font-bold">$ {planPrice}</span>
	<Separator class="my-4 h-[1px] w-full bg-sky-800/50" />
	<div class="flex w-full flex-grow flex-col items-center justify-start gap-3">
		{#each planFeatures as feature}
			<div class="flex w-full flex-row items-center justify-start gap-2">
				<CheckIcon class="h-5 w-5 text-sky-500" />
				<span class="text-sm text-gray-600"> {feature} </span>
			</div>
		{/each}
	</div>
	<Separator class="my-4 h-[1px] w-full bg-sky-800/50" />
	<form method="post" action="?/session">
		<input
			type="hidden"
			name="orgStripeId"
			value={organization.organizationMetadata.stripeCustomerId}
		/>
		<input type="hidden" name="orgEmail" value={user.email} />
		<input type="hidden" name="priceId" value={priceId} />
		<Button type="submit" class="w-full transition-all duration-150 hover:bg-sky-500"
			>Select Plan</Button
		>
	</form>
</div>
