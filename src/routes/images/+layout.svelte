<script lang="ts">
	import { page } from '$app/stores';

	const background = $page.url.searchParams.get('background') || 'eggshell';
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
