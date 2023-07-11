<script lang="ts">
	export let value: string | number;
	export let id: string;
	export let max: number = 100;
	export let min: number = 0;
	export let step: number = 1;

	$: style = `--value: ${((Number(value) - min) / (max - min)) * 100}%`;
</script>

<input type="range" class="slider" bind:value {id} on:input {style} {max} {min} {step} />

<style>
	.slider {
		-webkit-appearance: none;
		background: transparent;
		height: 16px;
		width: 100%;
		--thumb-size: 12.5px;
		--track-height: 2.5px;
	}
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50%;
		background: var(--stroke-player-primary);
		margin-top: -5px;
		cursor: pointer;
	}
	.slider::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--track-height);
		cursor: pointer;
		background: linear-gradient(
			90deg,
			var(--stroke-player-primary) 0 var(--value),
			var(--stroke-player-secondary) var(--value)
		);
		border-radius: 2px;
	}
	.slider::-moz-range-thumb {
		border: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50%;
		background: var(--stroke-player-primary);
		cursor: pointer;
	}
	.slider::-moz-range-track {
		width: 100%;
		height: var(--track-height);
		cursor: pointer;
		background: var(--stroke-player-secondary);
		border-radius: 2px;
	}
	.slider::-moz-range-progress {
		height: var(--track-height);
		background: var(--stroke-player-primary);
	}
	.slider:focus {
		outline: none;
	}
	.slider::-ms-thumb {
		border: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50%;
		background: var(--stroke-player-primary);
		cursor: pointer;
	}
	.slider::-ms-track {
		background: transparent;
		border-color: transparent;
		color: transparent;
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: var(--stroke-player-secondary);
		border-radius: 50%;
		border-width: 8px 0;
	}
	.slider::-ms-fill-lower {
		background: var(--stroke-player-primary);
		border-radius: 2px;
	}
</style>
