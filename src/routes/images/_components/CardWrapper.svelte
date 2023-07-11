<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { parseConfig } from '$utils/data';
	import { assumeIpfsHash, ipfsCidUrl } from '$utils/ipfs';
	import Card, { type CardConfig, type CardType } from '$lib/Card.svelte';
	import Loading from '$lib/Loading.svelte';

	export let cardType: CardType = 'vertical';

	let config: CardConfig | undefined = undefined;
	let image: string;
	let loading = false;

	let configParam = $page.url.searchParams.get('config') || '';
	const imageParam =
		$page.url.searchParams.get('image') || 'QmXHt66FELHYMgQbWVq1nZ5FxzgyNq6gbNBeNKNA7YccSW/1.png';
	const title = $page.url.searchParams.get('title');
	const spin = $page.url.searchParams.get('spin');

	async function loadImage() {
		loading = true;
		let cidUrl = imageParam;
		if (assumeIpfsHash(imageParam)) {
			cidUrl = ipfsCidUrl(imageParam);
		}
		return fetch(cidUrl)
			.then((response) => response.blob())
			.then((data) => {
				image = URL.createObjectURL(data);
				return image;
			})
			.catch((error) => {
				console.log(error);
				return '';
			})
			.finally(() => {
				loading = false;
			});
	}

	async function loadConfig() {
		return parseConfig(configParam).then(([isUrl, data]) => {
			if (isUrl) {
				fetch(data)
					.then((response) => response.json())
					.then((data) => {
						return data;
					})
					.catch((error) => {
						console.log(error);
						return {};
					});
			} else {
				return data;
			}
		});
	}

	onMount(async () => {
		if (imageParam) {
			image = await loadImage();
		}
		if (!configParam) {
			const defaultConfig = {
				common: {
					image,
					innerBorder: {
						type: 'solid',
						color: 'slategray',
						width: '1px'
					},
					imageStyle: {
						placement: {
							top: '60px'
						},
						cover: true
					},
					background: '#ededed',
					title: title || '',
					titleStyle: {
						textAlign: 'center'
					}
				}
			};
			configParam = window.btoa(JSON.stringify(defaultConfig));
		}
		config = await loadConfig();
		// I don't even know how config can be undefined here, but typescript says so
		if (!config) {
			config = { common: {} };
		}
		if (!config.common) {
			config.common = {};
		}
		config.common.image = image;
	});
</script>

{#if loading}
	<Loading />
{/if}
{#if config}
	<Card spin={Boolean(spin)} {cardType} cardConfig={config} />
{/if}
