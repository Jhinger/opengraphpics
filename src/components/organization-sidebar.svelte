<script lang="ts">
	import * as Avatar from '$components/ui/avatar/';
	import HomeIcon from 'virtual:icons/mdi/home-outline';
	import ImageIcon from 'virtual:icons/mdi/image-outline';
	import PaymentIcon from 'virtual:icons/mdi/payment';
	import PeopleIcon from 'virtual:icons/mdi/people-outline';
	import { getContext } from 'svelte';
	import type { User } from '$types';
	import { initials } from '$lib/utils';
	import { page } from '$app/stores';

	const user = getContext<User>('user');
</script>

<nav class="flex h-screen w-[15rem] flex-col items-center justify-between bg-gray-100 py-6">
	<a
		href="/dashboard"
		class="mb-6 flex w-full flex-row items-center justify-center gap-2 font-bold"
	>
		<div class="aspect-square w-6 rounded-sm bg-sky-300"></div>
		<span>OpenGraph.pics</span>
	</a>
	<div class="my-4 flex w-full flex-grow flex-col items-start">
		<div class="mb-1 ml-8 text-xxs font-bold uppercase text-gray-400">General</div>
		<div class="flex w-full flex-col gap-1 pl-2 font-medium text-gray-500">
			<a
				href={`/${$page.params.organization}`}
				class="flex w-full items-center gap-2 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-300 hover:text-black"
			>
				<HomeIcon class="h-5 w-5" />
				<span>Dashboard</span>
			</a>
			<a
				href={`/${$page.params.organization}/images`}
				class="flex w-full items-center gap-2 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-300 hover:text-black"
			>
				<ImageIcon class="h-5 w-5" />
				<span>Images</span>
			</a>
			<a
				href={`/${$page.params.organization}/billing`}
				class="flex w-full items-center gap-2 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-300 hover:text-black"
			>
				<PaymentIcon class="h-5 w-5" />
				<span>Billing</span>
			</a>
			<a
				href={`/${$page.params.organization}/team`}
				class="flex w-full items-center gap-2 rounded-md px-6 py-2 duration-75 hover:cursor-pointer hover:bg-gray-300 hover:text-black"
			>
				<PeopleIcon class="h-5 w-5" />
				<span>Team</span>
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
