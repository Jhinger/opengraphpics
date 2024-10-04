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

<nav class="w-[15rem] bg-gray-100 h-screen py-6 flex flex-col justify-between items-center">
	<a
		href="/dashboard"
		class="font-bold w-full mb-6 flex flex-row justify-center items-center gap-2"
	>
		<div class="rounded-sm bg-sky-300 aspect-square w-6"></div>
		<span>OpenGraph.pics</span>
	</a>
	<div class="flex flex-col items-start w-full my-4 flex-grow">
		<div class="font-bold text-gray-400 text-xxs uppercase mb-1 ml-8">General</div>
		<div class="flex flex-col gap-1 text-gray-500 font-medium w-full pl-2">
			<a
				href={`/${$page.params.organization}`}
				class="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-300 hover:text-black w-full rounded-md px-6 py-2 duration-75"
			>
				<HomeIcon class="w-5 h-5" />
				<span>Dashboard</span>
			</a>
			<a
				href={`/${$page.params.organization}/images`}
				class="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-300 hover:text-black w-full rounded-md px-6 py-2 duration-75"
			>
				<ImageIcon class="w-5 h-5" />
				<span>Images</span>
			</a>
			<a
				href={`/${$page.params.organization}/billing`}
				class="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-300 hover:text-black w-full rounded-md px-6 py-2 duration-75"
			>
				<PaymentIcon class="w-5 h-5" />
				<span>Billing</span>
			</a>
			<a
				href={`/${$page.params.organization}/team`}
				class="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-300 hover:text-black w-full rounded-md px-6 py-2 duration-75"
			>
				<PeopleIcon class="w-5 h-5" />
				<span>Team</span>
			</a>
		</div>
	</div>
	<div class="flex flex-row gap-2">
		<Avatar.Root>
			<Avatar.Image src={user.picture} alt={user.name} draggable={false} />
			<Avatar.Fallback class="bg-sky-200">
				<span class="text-sky-800 text-smplus font-semibold hover:text-sky-500 duration-150"
					>{initials(user.name)}</span
				>
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<span class="font-semibold text-sm">{user.name}</span>
			<span class="text-xs text-gray-400">{user.email}</span>
		</div>
	</div>
</nav>
