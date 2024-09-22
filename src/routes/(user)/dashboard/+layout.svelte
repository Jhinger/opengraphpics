<script lang="ts">
	import Navbar from '$components/navbar.svelte';
	import Footer from '$components/footer.svelte';
	import { Toaster } from '$components/ui/sonner';
	import type { Snippet } from 'svelte';
	const { children } = $props<{
		children: Snippet;
	}>();
</script>

<div>
	<Toaster richColors />
	<Navbar />
	{@render children()}
	<Footer />
</div>
