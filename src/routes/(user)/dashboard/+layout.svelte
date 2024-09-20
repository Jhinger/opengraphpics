<script lang="ts">
	import Navbar from '$components/navbar.svelte';
	import Footer from '$components/footer.svelte';
	import type { Snippet } from 'svelte';
	const { children } = $props<{
		children: Snippet;
	}>();
</script>

<div>
	<Navbar />
	{@render children()}
	<Footer />
</div>
