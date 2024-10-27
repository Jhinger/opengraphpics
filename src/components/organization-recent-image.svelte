<script lang="ts">
	import type { Snippet } from 'svelte';

	// TODO: Update this component to have hover effect, onClick opens Modal with modifications.
	let { children, route, href } = $props<{ children: Snippet; route?: string; href?: string }>();
</script>

<div
	class="h-[8rem] w-[15rem] overflow-hidden rounded-md bg-gray-200 duration-100 hover:cursor-pointer hover:ring-2 hover:ring-sky-300"
>
	{@render children()}
</div>
