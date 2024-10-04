<script lang="ts">
	import { getContext } from 'svelte';
	import { initials } from '$lib/utils';
	import * as Avatar from '$components/ui/avatar/';
	import * as DropdownMenu from '$components/ui/dropdown-menu/';
	import PersonIcon from 'virtual:icons/mdi/person-outline';
	import LogoutIcon from 'virtual:icons/mdi/logout';
	import type { User } from '$types';
	const user = getContext<User>('user');
</script>

<div class="w-full h-fit flex flex-row justify-between items-center px-8 py-4">
	<a href="/" class="font-bold text-lg hover:cursor-pointer hover:text-sky-500 duration-150"
		>OpenGraph.pics</a
	>
	<div class="flex flex-row gap-12 text-smplus font-semibold">
		<span class="hover:cursor-pointer hover:text-sky-500 duration-150">FAQ</span>
		<span class="hover:cursor-pointer hover:text-sky-500 duration-150">settings</span>
		<span class="hover:cursor-pointer hover:text-sky-500 duration-150">share</span>
	</div>
	<div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root>
					<Avatar.Image src={user.picture} alt={user.name} draggable={false} />
					<Avatar.Fallback class="bg-sky-200">
						<span class="text-sky-800 text-smplus font-semibold hover:text-sky-500 duration-150"
							>{initials(user.name)}</span
						>
					</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>{user.name}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="flex flex-row gap-2 hover:cursor-pointer">
						<PersonIcon class="w-5 h-5" />
						<span> Profile </span>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="flex flex-row gap-2 hover:cursor-pointer">
						<LogoutIcon class="w-5 h-5" />
						<span>Log Out</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
