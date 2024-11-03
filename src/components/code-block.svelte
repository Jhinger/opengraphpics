<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import 'highlight.js/styles/tokyo-night-dark.css';

	hljs.registerLanguage('xml', xml);

	storeHighlightJs.set(hljs);

	let { organization, domain, route } = $props<{
		organization: string;
		domain: string;
		route: string;
	}>();
</script>

<!-- TODO: Update this to point to opengraph.pics url that is hosting this routes thumbnail. -->
<CodeBlock
	class="h-full w-full px-4 py-2"
	text="text-xxs"
	language="html"
	background="bg-gray-800"
	rounded="rounded-md"
	code={`
<title>${organization.toUpperCase()}</title>
<meta name="description" content="">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://${domain}">
<meta property="og:type" content="website">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:image" content="https://${domain}${route}">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="${domain}">
<meta property="twitter:url" content="https://${domain}${route}">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="https://${domain}${route}">
`}
	lineNumbers={false}
/>
