<script lang="ts">
	import { formatTime } from './utils';
	import Icon from '../Icon.svelte';

	export let currentTrack: number;
	export let tracks: MusicTrack[] = [];
    export let switchTrack: (index: number) => void;

	let listRef: HTMLDivElement;
	const scrollNext = () => {
		listRef.scrollBy(0, 76);
	};
</script>

<div class="tracks-container">
	<div class="track-list" bind:this={listRef}>
		{#each tracks as track, index}
			<div class="track" class:current={currentTrack === index} on:click={() => switchTrack(index)}>
				<div class="row">
                    {#if track.duration}
                        {index + 1}. {track.name}
                    {:else}
                        {index + 1}. {track.name} <span>Failed to load</span>
                    {/if}
					<span class="duration">{formatTime(track.duration)}</span>
				</div>
				<span class="artist-name">
					{track.artist}
				</span>
			</div>
			<div class="divider" />
		{/each}
	</div>
	{#if tracks.length > 3}
		<div class="arrow-down" on:click={scrollNext}>
			<Icon name="chevronDown" />
		</div>
	{/if}
</div>

<style>
	.tracks-container {
        font-family: monospace;
		width: 100%;
		background: var(--track-background);
		border-radius: 10px;
		padding: 8px 0;
	}
	.tracks-container .track-list {
		max-height: 215px;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.tracks-container .track-list::-webkit-scrollbar {
		display: none;
	}
	.tracks-container .track-list .divider {
		margin: 8px 16px;
		min-height: 2px;
		background-color: var(--stroke-tertiary);
	}
	.tracks-container .track-list .track {
		padding: 12px 32px;
		font-size: 14px;
		line-height: 16px;
		cursor: pointer;
	}
	.tracks-container .track-list .track .row {
		display: flex;
		justify-content: space-between;
	}

    .tracks-container .track-list .track .row span {
        font-size: small;
        color: var(--text-tertiary);
        opacity: 0.6;
    }

	.tracks-container .track-list .track .row .duration {
		color: var(--text-tertiary);
	}
	.tracks-container .track-list .track .artist-name {
		color: var(--text-secondary);
	}
	.tracks-container .track-list .current {
		background: var(--track-background-active);
	}
	.tracks-container .arrow-down {
		color: white;
		font-size: 16px;
		width: fit-content;
		border-radius: 50%;
		background-color: #808285;
		display: flex;
		align-content: center;
		justify-content: center;
		cursor: pointer;
		margin: 8px auto 0 auto;
	}
</style>
