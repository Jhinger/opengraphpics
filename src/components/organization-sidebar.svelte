<script lang="ts">
	import * as Avatar from '$components/ui/avatar/';
	import * as Sidebar from '$components/ui/sidebar';
	import HomeIcon from 'virtual:icons/mdi/home-outline';
	import ImageIcon from 'virtual:icons/mdi/image-outline';
	import PaymentIcon from 'virtual:icons/mdi/payment';
	import PeopleIcon from 'virtual:icons/mdi/people-outline';
	import GearIcon from 'virtual:icons/mdi/gear-outline';
	import ChevronDownIcon from 'virtual:icons/mdi/chevron-down';
	import * as DropdownMenu from '$components/ui/dropdown-menu';
	import { getContext } from 'svelte';
	import { assetPath } from '$lib/utils';
	import type { User } from '$types';
	import { initials } from '$lib/utils';
	import { page } from '$app/stores';

	const user = getContext<User>('user');
</script>

<Sidebar.Root variant="inset" class="bg-white-100" collapsible="offcanvas">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="bg-white ring-2 ring-gray-500 duration-100 hover:bg-white hover:ring-sky-500"
							>
								<div class="flex flex-row gap-2">
									<img
										src={assetPath('/assets/' + $page.params.organization + '/icon')}
										alt={$page.params.organization}
										class="h-5 w-5 rounded-sm"
									/>
									<span class="font-medium capitalize">{$page.params.organization}</span>
								</div>
								<ChevronDownIcon class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-[--bits-dropdown-menu-anchor-width]">
						{#each $page.data.userOrganizations as org}
							<DropdownMenu.Item>
								{#snippet child({ props })}
									<a
										data-sveltekit-reload
										href={`/${org.organization}`}
										{...props}
										class="flex flex-row items-center justify-start rounded-sm p-2 text-sm duration-100 hover:bg-gray-200"
									>
										<img
											src={assetPath('/assets/' + org.organization + '/icon')}
											alt={org.organization}
											class="h-5 w-5 rounded-sm"
										/>
										<span class="ml-2 capitalize">{org.organization}</span>
									</a>
								{/snippet}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>General</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={$page.url.pathname === `/${$page.params.organization}`}>
							{#snippet child({ props })}
								<a href={`/${$page.params.organization}`} {...props}>
									<HomeIcon class="h-5 w-5" />
									<span>Home</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={$page.url.pathname === `/${$page.params.organization}/images`}
						>
							{#snippet child({ props })}
								<a href={`/${$page.params.organization}/images`} {...props}>
									<ImageIcon class="h-5 w-5" />
									<span>Images</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Admin</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						isActive={$page.url.pathname === `/${$page.params.organization}/billing`}
					>
						{#snippet child({ props })}
							<a href={`/${$page.params.organization}/billing`} {...props}>
								<PaymentIcon class="h-5 w-5" />
								<span>Billing</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						isActive={$page.url.pathname === `/${$page.params.organization}/team`}
					>
						{#snippet child({ props })}
							<a href={`/${$page.params.organization}/team`} {...props}>
								<PeopleIcon class="h-5 w-5" />
								<span>Team</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						isActive={$page.url.pathname === `/${$page.params.organization}/settings`}
					>
						{#snippet child({ props })}
							<a href={`/${$page.params.organization}/settings`} {...props}>
								<GearIcon class="h-5 w-5" />
								<span>Settings</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="my-4">
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex flex-row items-center justify-center gap-4 py-1">
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
					<span class="text-xs text-gray-600">{user.email}</span>
				</div>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
