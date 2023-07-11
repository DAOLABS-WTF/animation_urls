<script lang="ts">
	export let name = 'wifi';
	export let style: string = '';
	export let rotation: number = 0;

	// Svg icons from https://tablericons.com/
	const paths = {
		'404': [
			'M3 7v4a1 1 0 0 0 1 1h3',
			'M7 7v10',
			'M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z',
			'M17 7v4a1 1 0 0 0 1 1h3',
			'M21 7v10'
		],
		chrevronDown: '<polyline points="6 9 12 15 18 9" fill="none" />',
		chrevronCircle: ['M13 15l-3 -3l3 -3', 'M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z'],
		play: ['M7 4v16l13 -8z'],
		refresh: ['M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4', 'M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4'],
		wifi: [
			'M9.172 15.172a4 4 0 0 1 5.656 0',
			'M6.343 12.343a8 8 0 0 1 11.314 0',
			'M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0'
		]
	};

	$: icon = paths[name];
</script>

<svg
	id={`icon-${name}`}
	xmlns="http://www.w3.org/2000/svg"
	width="22"
	height="22"
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="#2c3e50"
	fill="none"
	style={`${style} transform: rotate(${rotation}deg);`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#if Array.isArray(icon)}
		{#each icon as path}
			<path d={path} />
		{/each}
	{:else}
		{@html icon}
	{/if}
</svg>
