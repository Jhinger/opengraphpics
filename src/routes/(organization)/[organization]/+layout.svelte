<script lang="ts">
	import OrganizationSidebar from '$components/organization-sidebar.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<OrganizationSidebar />

	<div class="flex-1 bg-gray-100 p-3">
		<!-- White bubble content -->
		<div class="h-full w-full overflow-auto rounded-lg bg-white p-4 drop-shadow-md">
			{JSON.stringify($page.params)}
			{@render children()}
		</div>
	</div>
</div>
