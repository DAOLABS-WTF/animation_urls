<script lang="ts">
	import AudioControlIcons from '../AudioControlIcons.svelte';
	import Icon from '../Icon.svelte';
	import Slider from '../Slider.svelte';

	export let tracks: MusicTrack[] = [];

	export let loop: boolean;
	export let mixed: boolean;
	export let paused: boolean;
	export let player: HTMLAudioElement;
	export let volume: number;
	export let nextTrack: () => void;
	export let prevTrack: () => void;

	const play = () => {
		player.play();
	};
	const pause = () => {
		player.pause();
	};

	const changeVolume = ({ currentTarget }) => {
		volume = Number(currentTarget.value);
	};

	const minVolume = () => {
		volume = 0;
	};

	const maxVolume = () => {
		volume = 1;
	};
</script>

<div class="controls">
	<div class="icon" class:active={loop} on:click={() => (loop = !loop)}>
		<AudioControlIcons iconName="repeat" />
	</div>
	{#if tracks.length > 1}
		<div class="icon" on:click={prevTrack}>
			<AudioControlIcons iconName="previous" />
		</div>
	{/if}
	{#if paused}
		<div class="icon" on:click={play}>
			<AudioControlIcons iconName="play" />
		</div>
	{:else}
		<div class="icon" on:click={pause}>
			<AudioControlIcons iconName="pause" />
		</div>
	{/if}
	{#if tracks.length > 1}
		<div class="icon" on:click={nextTrack}>
			<AudioControlIcons iconName="next" />
		</div>
		<div class="icon" class:active={mixed} on:click={() => (mixed = !mixed)}>
			<AudioControlIcons iconName="mix" />
		</div>
	{/if}
</div>
<div class="volume">
	<div class="icon" on:click={minVolume}>
		<AudioControlIcons iconName="volumeMin" />
	</div>
	<Slider bind:value={volume} id="volume" on:input={changeVolume} max={1} step={0.01} />
	<div class="icon" on:click={maxVolume}>
		<AudioControlIcons iconName="volumeMax" />
	</div>
</div>

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		width: 160px;
		min-height: 24px;
		margin: 8px auto;
		align-items: center;
		color: var(--text-tertiary);
	}

	.active {
		background-color: var(--track-background);
	}

	.icon {
		cursor: pointer;
		display: flex;
		padding: 4px;
	}
	.volume {
		display: flex;
		gap: 16px;
		width: 100%;
		align-items: center;
		color: var(--text-tertiary);
	}
</style>
