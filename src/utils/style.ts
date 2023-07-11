import type * as CSS from 'csstype';

function formatStyleKey(key: string) {
	return key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export function objectToStyleString(obj: CSS.Properties) {
	return Object.entries(obj || {})
		.map(([key, value]) => `${formatStyleKey(key)}: ${value}`)
		.join('; ');
}
