import { assumeIpfsHash, ipfsCidUrl } from './ipfs';

export function getBtoa() {
	if (typeof window === 'undefined') {
		return (str: string) => Buffer.from(str).toString('base64');
	}
	return window.btoa;
}

export function getAtob() {
	if (typeof window === 'undefined') {
		return (str: string) => Buffer.from(str, 'base64').toString('utf-8');
	}
	return window.atob;
}

export function getUrl(param: string) {
	let scriptUrl = param;
	if (assumeIpfsHash(scriptUrl)) {
		scriptUrl = ipfsCidUrl(param);
	}
	return scriptUrl;
}

function isBase64(str: string) {
	const btoa = getBtoa();
	const atob = getAtob();
	try {
		return btoa(atob(str)) == str;
	} catch (err) {
		return false;
	}
}

function jsonFromBase64(str: string) {
	const atob = getAtob();
	return JSON.parse(atob(str));
}

export async function parseConfig(configParam: string) {
	/**
	 * Assuming config can be loaded from a URL, either through a ipfs hash or a straight up URL.
	 * Or by parsing base64 encoded JSON.
	 */
	if (isBase64(configParam)) {
		return [false, jsonFromBase64(configParam)];
	}
	return [true, getUrl(configParam)];
}
