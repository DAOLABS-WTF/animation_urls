<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import VideoPlayer from 'svelte-video-player-kit';
	import { assumeIpfsHash, ipfsCidUrl } from '$utils/ipfs';
	import { parseConfig } from '$utils/data';
	import Loading from '$lib/Loading.svelte';
	import type { VideoPlayerType } from './types';
	import { browser } from '$app/environment';

	let loading = false;
	let video: string;
	let config: VideoPlayerType = {};

	const defaultConfig: VideoPlayerType = {
		controlsHeight: '30px',
		color: '#f5a312',
		barsBgColor: '#ffecbb'
	};

	const videoParam = browser
		? $page.url.searchParams.get('video') ||
		  'bafybeiaqyn5wolrdfcskbicvuwden75cwdn3cr7fjliaj4lsj7zziqzkii'
		: '';

	let configParam = browser ? $page.url.searchParams.get('config') || '' : '';

	function setBackgroundFromConfig() {
		if (config.playerBgColor) {
			document.body.style.background = config.playerBgColor;
		}
	}

	async function loadVideo() {
		let videoUrl = videoParam;
		if (assumeIpfsHash(videoParam)) {
			videoUrl = ipfsCidUrl(videoParam);
		}
		fetch(videoUrl)
			.then((response) => response.blob())
			.then((data) => {
				video = URL.createObjectURL(data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				loading = false;
			});
	}

	async function loadConfig() {
		parseConfig(configParam).then(([isUrl, data]) => {
			if (isUrl) {
				fetch(data)
					.then((response) => response.json())
					.then((data) => {
						config = { ...defaultConfig, ...data };
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				config = { ...defaultConfig, ...data };
			}
			setBackgroundFromConfig();
		});
	}

	onMount(async () => {
		loading = true;
		if (!configParam) {
			configParam = window.btoa(JSON.stringify(defaultConfig));
		}
		await loadConfig();
		if (videoParam) {
			await loadVideo();
		}
	});
</script>

{#if loading}
	<Loading />
{/if}

{#if video}
	<div class="wrapper">
		<div
			class={config.height || config.width ? 'fixed' : 'full'}
			style={config.height || config.width
				? `width: ${config.width}px; height: ${config.height}px`
				: `width: 100vw; height: 100vh`}
		>
			<VideoPlayer source={video} {...config} />
		</div>
	</div>
{/if}

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	:global(.full .aspect) {
		height: 100vh !important;
		padding-top: unset !important;
	}
</style>
