<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Loading from '$lib/Loading.svelte';
	import P5jsPreview from '$lib/P5jsPreview.svelte';
	import { assumeIpfsHash, ipfsCidUrl } from '$utils/ipfs';
	import { parseConfig } from '$utils/data';
	import { browser } from '$app/environment';

	type Unit = 'px' | 'em' | 'rem' | 'vw' | 'vh' | '%';

	type Config = {
		seed?: number;
		width?: Unit;
		height?: Unit;
		fullscreen?: boolean;
		background?: string;
		respectAspectRatio?: boolean;
	};

	const defaultConfig = {
		seed: 20,
		fullscreen: true,
		respectAspectRatio: true
	};

	let loading = false;
	let script: string;
	let config: Config = {};

	const scriptParam = browser
		? $page.url.searchParams.get('script') || 'QmcGKReCjttTrvNkYm41jpDnNmD2gMVtjepsthpfrPB2vd'
		: '';

	let configParam = browser ? $page.url.searchParams.get('config') || '' : '';

	async function loadScript() {
		loading = true;
		let scriptUrl = scriptParam;
		if (assumeIpfsHash(scriptParam)) {
			scriptUrl = ipfsCidUrl(scriptParam);
		}
		fetch(scriptUrl)
			.then((response) => response.text())
			.then((data) => {
				script = data;
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
						config = data;
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				config = data;
			}
		});
	}

	onMount(async () => {
		if (!configParam) {
			// NOTE: we have to set this here because of accessing window.
			configParam = window.btoa(JSON.stringify(defaultConfig));
		}
		await loadConfig();

		if (scriptParam) {
			await loadScript();
		}
	});
</script>

{#if loading}
	<Loading />
{/if}

{#if script}
	<P5jsPreview {script} {...config} fullscreen={!(config.height || config.width)} />
{/if}
