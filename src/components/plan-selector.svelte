<script lang="ts">
	import PlanCard from '$components/plan-card.svelte';
	import { Switch } from '$components/ui/switch';
	import {
		ENTRY_PLAN,
		GROWTH_PLAN,
		ENTERPRISE_PLAN,
		ENTRY_MONTHLY_PRICE_ID,
		ENTRY_YEARLY_PRICE_ID,
		GROWTH_MONTHLY_PRICE_ID,
		GROWTH_YEARLY_PRICE_ID,
		ENTERPRISE_MONTHLY_PRICE_ID,
		ENTERPRISE_YEARLY_PRICE_ID
	} from '$constants';

	let isYearly = $state(false);

	let entryPlan = $derived(isYearly ? ENTRY_PLAN * 12 : ENTRY_PLAN);
	let growthPlan = $derived(isYearly ? GROWTH_PLAN * 12 : GROWTH_PLAN);
	let enterprisePlan = $derived(isYearly ? ENTERPRISE_PLAN * 12 : ENTERPRISE_PLAN);
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8">
	<div class="flex flex-col items-center justify-center gap-4">
		<h1 class="text-4xl font-bold tracking-tight">Simple & Transparent Pricing</h1>
		<div class="max-w-[40rem] text-center text-sm text-gray-500">
			Flexible plans designed to grow with your team - increase click-through rates, enhance the
			attractiveness of your content, and establish your brand identity.
		</div>
	</div>
	<div class="flex flex-row items-center justify-center gap-2">
		<span>Monthly</span>
		<Switch bind:checked={isYearly} />
		<span>Yearly</span>
	</div>
	<div class="flex flex-row items-center justify-center gap-8">
		<PlanCard
			planName="Entry"
			planPrice={entryPlan}
			planFeatures={[
				'Up to 100 routes',
				'1 Member',
				'Global fallback thumbnail',
				'Image Optimization',
				'Basic analytics'
			]}
			priceId={isYearly ? ENTRY_YEARLY_PRICE_ID : ENTRY_MONTHLY_PRICE_ID}
		/>
		<PlanCard
			planName="Growth"
			planPrice={growthPlan}
			planFeatures={[
				'Up to 1000 routes',
				'5 Members',
				'Route-specific fallback thumbnail',
				'Image Optimization',
				'On-Demand generation',
				'Monthly route refreshes',
				'Basic Analytics'
			]}
			priceId={isYearly ? GROWTH_YEARLY_PRICE_ID : GROWTH_MONTHLY_PRICE_ID}
		/>
		<PlanCard
			planName="Enterprise"
			planPrice={enterprisePlan}
			planFeatures={[
				'Unlimited routes',
				'10 Members',
				'Custom thumbnails',
				'Image Optimization',
				'Instant route refreshes',
				'* Multi-Site support'
			]}
			priceId={isYearly ? ENTERPRISE_YEARLY_PRICE_ID : ENTERPRISE_MONTHLY_PRICE_ID}
		/>
	</div>
	<span class="text-sm text-gray-500">
		<span class="text-red-500">*</span> Feature provided on request - contact us for more information.
	</span>
</div>
