<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	const background = browser ? $page.url.searchParams.get('background') || 'eggshell' : '';
</script>

<main style="background: {background}">
	<slot />
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
