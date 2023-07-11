<script lang="ts">
	import { onMount } from 'svelte';
	import { ipfsUrlToCid } from '$utils/ipfs';
	import { extractColors } from '$utils/colorPaletteExtraction';
	import { getNewRandomNumber } from '$utils/numbers';
	import type exampleConfig from '$routes/music/_example_data/exampleConfigMulti.json';
	import Controls from './Controls.svelte';
	import Img from '../Img.svelte';
	import Record from '../Record.svelte';
	import Slider from '../Slider.svelte';
	import Tracks from './Tracks.svelte';
	import { formatTime } from './utils';
	import Icon from '$lib/Icon.svelte';

	export let config: typeof exampleConfig = [];

	export let currentAlbum = 0;
	export let currentTrack = 0;

	export let cover: string = '';
	export let tracks: MusicTrack[] = [];

	let loop = false;
	let volume = 1;
	let paused = true;
	let mixed = false;
	let player: HTMLAudioElement;
	let duration;
	let currentTime = 0;
	let variablesString = '';

	function initAlbum() {
		currentTrack = 0;
		if (config.length) {
			cover = config[currentAlbum].cover;
			tracks = config[currentAlbum].tracks;
		}
		if (tracks.length > 1) {
			tracks.forEach((track) => {
				if (!track.duration) {
					let audio = new Audio();
					audio.src = track.file;
					audio.onloadedmetadata = () => {
						track.duration = audio.duration;
						tracks = tracks;
					};
				}
			});
		}
	}

	const switchTrack = async (index: number) => {
		let newIndex = index;
		if (index < 0) {
			newIndex = tracks.length - 1;
		}
		if (index === tracks.length) {
			newIndex = 0;
		}
		currentTrack = newIndex;
		player.autoplay = true;
	};

	function nextTrack() {
		switchTrack(currentTrack + 1);
	}
	function prevTrack() {
		switchTrack(currentTrack - 1);
	}

	const seek = ({ currentTarget }: { currentTarget: HTMLInputElement }) => {
		player.pause();
		currentTime = Number(currentTarget.value);
		player.play();
	};

	const handleNext = () => {
		if (loop) {
			return;
		}
		let next = currentTrack + 1;
		if (mixed) {
			next = getNewRandomNumber(currentTrack, 0, tracks.length - 1);
		}
		switchTrack(next);
	};

	function switchAlbum(index: number) {
		let newIndex = index;
		if (index < 0) {
			newIndex = config.length - 1;
		}
		if (index === config.length) {
			newIndex = 0;
		}
		currentAlbum = newIndex;
		initAlbum();
	}

	function coverColors() {
		const extractedColors = extractColors('cover');
		if (!extractedColors) {
			return;
		}
		const [extracted, complement] = extractedColors;
		document.body.style.backgroundColor = extracted[1];
		variablesString = `
			--stroke-player-primary: ${extracted[extracted.length - 1]};
			--stroke-player-secondary: ${extracted[0]};
			--track-background: ${extracted[0]};
			--track-background-active: ${extracted[2]};
			--text-secondary: ${complement[Math.floor(complement.length / 1.5)]};
			--text-tertiary: ${complement[Math.floor(complement.length / 1.5) + 1]};
			--stroke-tertiary: ${complement[Math.floor(complement.length / 1.5) + 1]};
		`;
	}

	onMount(initAlbum);

	$: {
		if (!tracks[currentTrack]?.duration && tracks.length > 1) {
			if (currentTrack === tracks.length - 1) {
				currentTrack = 0;
			} else {
				currentTrack = currentTrack + 1;
			}
		}
	}
</script>

<div class="player-container" style={variablesString}>
	<div class="cover-container" class:missing={!cover}>
		{#if cover}
			<Img
				id="cover"
				styles={{
					width: '100%',
					borderRadius: '10px',
					background: 'var(--background-player-cover)'
				}}
				onLoad={coverColors}
				src={cover}
				alt={ipfsUrlToCid(cover)}
			>
				<div slot="failed">
					<Record />
				</div>
			</Img>
		{:else}
			<Record />
		{/if}
		{#if config.length > 1}
			<div class="album-switcher">
				{#if currentAlbum > 0}
					<span class="album-switcher__button" on:click={() => switchAlbum(currentAlbum - 1)}>
						<Icon name="chrevronCircle" />
					</span>
				{/if}
				{#if currentAlbum < config.length - 1}
					<span class="album-switcher__button" on:click={() => switchAlbum(currentAlbum + 1)}>
						<Icon name="chrevronCircle" rotation={180} />
					</span>
				{/if}
			</div>
		{/if}
	</div>
	<div class="controls-container">
		{#if tracks.length > 1}
			<Tracks {currentTrack} {tracks} {switchTrack} />
		{/if}
		{#if tracks.length > 0}
			<div class="player">
				<audio
					src={tracks[currentTrack].file}
					preload="metadata"
					{loop}
					bind:this={player}
					bind:currentTime
					bind:volume
					bind:paused
					bind:duration
					on:ended={handleNext}
				/>
				<div class="progress">
					<div class="timers">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
					<Slider bind:value={currentTime} id="progress" on:input={seek} bind:max={duration} />
				</div>
				<Controls
					{player}
					{nextTrack}
					{prevTrack}
					{tracks}
					bind:paused
					bind:loop
					bind:mixed
					bind:volume
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.album-switcher {
		transform: translateY(18px);
		text-align: center;
	}

	.player-container {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		max-width: 1440px;
		min-width: 300px;
		margin: 0 auto;
	}

	.player-container .cover-container {
		position: relative;
		padding: 26px;
		border-radius: 10px;
		background-color: var(--track-background);
		box-shadow: inset 0px 0px 100px 100px var(--background-l0);
		height: fit-content;
		flex: 0 0 40%;
		max-width: 40%;
	}

	.player-container .controls-container {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		justify-content: center;
		flex: 0 0 40%;
		max-width: 40%;
	}

	@media (max-width: 768px) {
		.player-container {
			flex-direction: column;
			height: unset;
			min-height: 100vh;
			gap: 1rem;
			justify-content: unset;
		}

		.player-container .cover-container {
			flex: 0 0 100%;
			max-width: 100%;
			border-radius: 0 0 10px 10px;
		}

		.player-container .controls-container {
			flex: 0 0 100%;
			max-width: 80%;
			width: 80%;
		}
	}
	.player-container .missing {
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		border: 0.4px solid rgba(0, 0, 0, 0.2);
		font-size: 100px;
		color: rgba(245, 163, 18, 0.24);
		height: 500;
	}
	.player-container .player {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: var(--background-l0);
		border-radius: 10px;
		padding: 5%;
	}
	.player-container .player .progress {
		display: flex;
		flex-direction: column;
	}
	.player-container .player .progress .timers {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-tertiary);
		margin-bottom: 14px;
	}

	div[slot='failed'] {
		display: flex;
	}
</style>
