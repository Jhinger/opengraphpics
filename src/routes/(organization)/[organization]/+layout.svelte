<script lang="ts">
	import { page } from '$app/stores';
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
	<OrganizationSidebar />

	<div class="flex-1 bg-gray-100 p-3">
		<!-- White bubble content -->
		<div
			class="h-full w-full overflow-y-scroll rounded-lg bg-white p-4 drop-shadow-md scrollbar scrollbar-track-white scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full hover:scrollbar-track-gray-400"
		>
			{@render children()}
		</div>
	</div>
</div>
