<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from './Loading.svelte';

	export let script: string;

	export let fullscreen = false;
	export let width = '450px';
	export let height = '450px';
	export let respectAspectRatio = true;
	export let seed: number | undefined = undefined;
	export let background: string | undefined = undefined;

	let loading = true;
	let tried = 0;
	let error = false;

	function disableScroll() {
		document.body.style.overflow = 'hidden';
	}

	function onCanvasLoad(canvas: HTMLCanvasElement) {
		/**
		 * Resets height and width depending on canvas.
		 */
		const potentialMaxHeight = canvas.scrollHeight;
		const potentialMaxWidth = canvas.scrollWidth;

		const aspectRatio = potentialMaxWidth / potentialMaxHeight;

		if (fullscreen) {
			disableScroll();
		}

		if (respectAspectRatio) {
			if (aspectRatio > 1) {
				canvas.style.width = fullscreen ? '100vw' : width;
				canvas.style.height = 'auto';
			} else {
				canvas.style.width = 'auto';
				canvas.style.height = fullscreen ? '100vh' : height;
			}
		} else {
			canvas.style.width = fullscreen ? '100vw' : width;
			canvas.style.height = fullscreen ? '100vh' : height;
		}
		loading = false;
	}

	function checkCanvas(ms: number, timeoutId?: ReturnType<typeof setTimeout>) {
		const canvas = document.querySelector('canvas');
		clearTimeout(timeoutId);
		if (canvas) {
			onCanvasLoad(canvas);
		} else if (tried > 7) {
			console.error('Could not find canvas, there could be an error in the sketch.');
			error = true;
			loading = false;
		} else {
			tried++;
			ms *= 2;
			timeoutId = setTimeout(() => checkCanvas(ms, timeoutId), ms);
		}
	}

	onMount(() => {
		if (script) {
			if (seed) {
				const randomSeedLine = `randomSeed(${seed});`;
				// find function setup() { and add randomSeedLine on the line following setup(
				script = script.replace(
					/setup\(\)\s*{/,
					`setup() {
				${randomSeedLine}`
				);
			}
			// Embed p5js in body script tag
			const element = document.createElement('script');
			element.onerror = () => {
				error = true;
				loading = false;
			};
			element.innerHTML = script;
			document.body.appendChild(element);
			// Wait for canvas to load
			checkCanvas(200);

			const doc = document.querySelector('html');
			if (background && doc) {
				doc.style.backgroundColor = background;
			}
		}
	});
</script>

{#if loading}
	<Loading enableScroll={!fullscreen} />
{:else if error}
	<main>
		<h1>Error loading sketch</h1>
	</main>
{/if}

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
	<!-- TODO: find right package -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script> -->
	<script
		src="https://cdn.rawgit.com/jwagner/simplex-noise.js/87440528bcf8ec89840e974d8f76cfe3da548c37/simplex-noise.min.js"></script>
	<script src="https://unpkg.com/@metamoar/moarp5@0.0.58/dist/moarp5.js"></script>
	<script src="https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js"></script>
</svelte:head>

<style>
	:global(body) {
		height: 100vh;
		width: 100vw;
	}

	:global(main) {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
