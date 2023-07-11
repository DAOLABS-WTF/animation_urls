<script lang="ts">
	import type * as CSS from 'csstype';
	import { objectToStyleString } from '$utils/style';
	import Icon from './Icon.svelte';
	import Skeleton from './Skeleton.svelte';

	export let src: string;
	export let alt = '';
	export let styles: CSS.Properties = {};
	export let maxTries = 3;
	export let onLoad = () => {};

	let imgRef: HTMLImageElement;
	let failed = false;
	let loading = true;
	let tried = 0;

	function handleLoad() {
		loading = false;
		if (onLoad) {
			onLoad();
		}
	}

	function handleError() {
		if (tried >= maxTries) {
			failed = true;
			loading = false;
			return;
		}
		tried += 1;
		setTimeout(() => {
			imgRef.src = src;
		}, tried * 1500);
	}

	function tryAgain() {
		failed = false;
		loading = true;
		tried += 1;
		imgRef.src = src;
	}

	$: {
		if (failed && $$slots.failed) {
			// try one more time with maxTries * 10 seconds in between
			setTimeout(() => {
				tried += 1;
				imgRef.src = src;
			}, tried * 10000);
		}
	}

	// if src changed remove failed
	$: failed = Boolean(!src);
</script>

{#if loading}
	<Skeleton style={objectToStyleString(styles)} />
{:else if failed}
	{#if $$slots.failed}
		<slot name="failed" />
	{:else}
		<div class="failed" style={objectToStyleString(styles)}>
			<div class="message">
				<small> {tried} tries </small>
				<Icon name="404" style="fill: none" />
			</div>
			<span class="refresh" on:click|stopPropagation={tryAgain}>
				<Icon name="refresh" style="fill: none" />
			</span>
		</div>
	{/if}
{/if}
<img
	class:visible={!loading && !failed}
	bind:this={imgRef}
	{src}
	{alt}
	{...$$restProps}
	style={objectToStyleString(styles)}
	on:load={handleLoad}
	on:loadstart={() => (loading = true)}
	on:error={handleError}
/>

<style>
	img {
		max-width: 100%;
		display: none;
	}

	.failed {
		display: flex;
		justify-content: space-between;
		height: 100%;
		font-size: 20px;
		background: linear-gradient(0deg, var(--background-l1), var(--background-l2));
	}

	.failed small {
		font-size: 8px;
		font-weight: 400;
		padding: 0 5px;
	}

	.failed .message {
		display: flex;
		align-items: center;
	}
	.failed .refresh {
		align-self: end;
		padding-right: 5px;
		font-size: 16px;
		cursor: pointer;
	}

	.failed .refresh:hover {
		transform: scale(1.05);
		color: var(--icon-action-primary);
	}

	.visible {
		display: block;
		transition: opacity 0.3s ease-in-out;
	}
</style>
