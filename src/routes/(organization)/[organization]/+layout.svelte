<script lang="ts">
	import { page } from '$app/stores';
	import * as Sidebar from '$components/ui/sidebar';
	import OrganizationSidebar from '$components/organization-sidebar.svelte';
	import { setContext } from 'svelte';
	import createOrganizationContext from '$contexts/createOrganizationContext.svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();

	// TODO: evaluate setting Organization Context vs just passing value from layout.
	const organizationContext = createOrganizationContext({
		organizationMetadata: $page.data.organizationMetadata,
		organizationUsers: $page.data.organizationUsers,
		organizationViews: $page.data.organizationViews,
		organizationRoutes: $page.data.organizationRoutes,
		organizationInvitations: $page.data.organizationInvitations
	});
	setContext('organization', organizationContext);
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<Sidebar.Provider>
		<OrganizationSidebar />
		<div class="bg-white-100 flex-1 p-3">
			<!-- White bubble content -->
			<div
				class="relative h-full w-full overflow-y-scroll rounded-lg bg-slate-100 p-4 ring-2 ring-slate-200 scrollbar scrollbar-track-slate-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full hover:scrollbar-track-gray-400"
			>
				<Sidebar.Trigger class="absolute left-4 top-4" />
				{@render children()}
			</div>
		</div>
	</Sidebar.Provider>
</div>
