<script lang="ts">
	import Avatar from '$components/ui/avatar/avatar.svelte';
	import { cn } from '$lib/utils.js';

	const { className } = $props<{ className?: string }>();
</script>

<div
	class={cn(
		'flex flex-col h-full w-[15rem] bg-white rounded-md hover:cursor-pointer hover:ring-2 hover:ring-sky-500 duration-150',
		className
	)}
></div>
