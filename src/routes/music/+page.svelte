<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { parseConfig } from '$utils/data';
	import Loading from '$lib/Loading.svelte';
	import MusicPlayer from '$lib/MusicPlayer';
	import type exampleConfig from './_example_data/exampleConfigMulti.json';

	let configParam =
		$page.url.searchParams.get('cid') || 'Qmbaj3ASjHMbZ9qh3Wz7yGaKWGLKjE8dcvUKErZWqTL8Ad';

	let config: typeof exampleConfig;
	let loading: boolean = false;

	async function loadConfig() {
		return parseConfig(configParam).then(([isUrl, data]) => {
			if (isUrl) {
				return fetch(data)
					.then((response) => response.json())
					.then((data) => {
						return data;
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				return data;
			}
		});
	}

	onMount(async () => {
		if (configParam) {
			loading = true;
			config = await loadConfig();
			// Create an array of promises for each preloaded track
			const preloadingPromises = config.map((item) => {
				const coverImage = new Image();
				coverImage.src = item.cover;

				return Promise.all(
					item.tracks.map((track) => {
						const audio = new Audio();
						audio.src = track.file;
						// Create a promise that resolves when the audio can play through without buffering
						return new Promise<void>((resolve) => {
							audio.addEventListener('canplaythrough', () => {
								resolve();
							});
						});
					})
				);
			});

			// Wait for all preloading promises to resolve
			Promise.all(preloadingPromises).then(() => {
				// Set loading to false when all preloading promises have resolved
				loading = false;
			});
		}
	});
</script>

{#if loading}
	<Loading />
{:else if config}
	<MusicPlayer {config} />
{/if}
