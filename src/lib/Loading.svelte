<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Skeleton from './Skeleton.svelte';

	export let enableScroll = true;

	let seconds = 0;
	let timer: ReturnType<typeof setInterval>;

	onDestroy(() => {
		if (enableScroll) {
			document.body.style.overflow = 'auto';
		}
		clearInterval(timer);
	});
	// onMount start a timer to count up number of seconds loading
	onMount(async () => {
		// disable scroll on page
		document.body.style.overflow = 'hidden';
		timer = setInterval(() => {
			seconds++;
		}, 1000);
	});
</script>

<!-- A full page loading component -->
<Skeleton width="100vw" height="100vh" />
{#if seconds}
	<h1>
		Loading {seconds}s
		<div>
			{#each Array.from({ length: seconds % 4 }) as _, i}
				.
			{/each}
		</div>
	</h1>
{/if}

<style>
	h1 {
		bottom: 10px;
		color: white;
		right: -55px;
		position: absolute;
		transform: translate(-50%, -50%);
	}

	div {
		display: inline-block;
		min-width: 50px;
	}
</style>
