<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import createUserContext from '$contexts/createUserContext.svelte';
	import { setContext } from 'svelte';

	let { children, data } = $props<{
		children: Snippet;
		data: LayoutData;
	}>();

	const userContext = createUserContext(data.user);
	setContext('user', userContext);
</script>

<div class="app">
	{@render children()}
</div>
