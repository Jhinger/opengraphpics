<script lang="ts">
	import * as Avatar from '$components/ui/avatar/';
	import HomeIcon from 'virtual:icons/mdi/home-outline';
	import ImageIcon from 'virtual:icons/mdi/image-outline';
	import PaymentIcon from 'virtual:icons/mdi/payment';
	import PeopleIcon from 'virtual:icons/mdi/people-outline';
	import NotoRat from 'virtual:icons/noto-v1/rat';
	import GearIcon from 'virtual:icons/mdi/gear-outline';
	import { getContext } from 'svelte';
	import type { User } from '$types';
	import { initials } from '$lib/utils';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	const user = getContext<User>('user');
</script>

<nav class="flex h-screen w-[15rem] flex-col items-center justify-between bg-gray-100 py-6">
	<a
		href="/dashboard"
		class="mb-6 flex w-full flex-row items-center justify-center gap-1 font-bold"
	>
		<NotoRat class="h-7 w-7" />
		<span>OpenGraph.pics</span>
	</a>
	<div class="my-4 flex w-full flex-grow flex-col items-start">
		<div class="mb-1 ml-8 text-xxs font-bold uppercase text-gray-400">General</div>
		<div class="flex w-full flex-col gap-1 pl-2 text-smplus font-medium text-gray-500">
			<a
				href={`/${$page.params.organization}`}
				class={cn(
					$page.url.pathname === `/${$page.params.organization}` && 'bg-sky-100 text-sky-700',
					'flex w-full items-center gap-3 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-200 hover:text-black'
				)}
			>
				<HomeIcon class="h-5 w-5" />
				<span>Dashboard</span>
			</a>
			<a
				href={`/${$page.params.organization}/images`}
				class={cn(
					$page.url.pathname === `/${$page.params.organization}/images` &&
						'bg-sky-100 text-sky-700',
					'flex w-full items-center gap-3 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-200 hover:text-black'
				)}
			>
				<ImageIcon class="h-5 w-5" />
				<span>Images</span>
			</a>
			<a
				href={`/${$page.params.organization}/billing`}
				class={cn(
					$page.url.pathname === `/${$page.params.organization}/billing` &&
						'bg-sky-100 text-sky-700',
					'flex w-full items-center gap-3 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-200 hover:text-black'
				)}
			>
				<PaymentIcon class="h-5 w-5" />
				<span>Billing</span>
			</a>
			<a
				href={`/${$page.params.organization}/team`}
				class={cn(
					$page.url.pathname === `/${$page.params.organization}/team` && 'bg-sky-100 text-sky-700',
					'flex w-full items-center gap-3 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-200 hover:text-black'
				)}
			>
				<PeopleIcon class="h-5 w-5" />
				<span>Team</span>
			</a>
			<a
				href={`/${$page.params.organization}/settings`}
				class={cn(
					$page.url.pathname === `/${$page.params.organization}/settings` &&
						'bg-sky-100 text-sky-700',
					'flex w-full items-center gap-3 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-200 hover:text-black'
				)}
			>
				<GearIcon class="h-5 w-5" />
				<span>Settings</span>
			</a>
		</div>
	</div>
	<div class="flex flex-row gap-2">
		<Avatar.Root>
			<Avatar.Image src={user.picture} alt={user.name} draggable={false} />
			<Avatar.Fallback class="bg-sky-200">
				<span class="text-smplus font-semibold text-sky-800 duration-150 hover:text-sky-500"
					>{initials(user.name)}</span
				>
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<span class="text-sm font-semibold">{user.name}</span>
			<span class="text-xs text-gray-400">{user.email}</span>
		</div>
	</div>
</nav>
