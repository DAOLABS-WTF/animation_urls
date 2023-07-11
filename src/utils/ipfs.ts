const DEFAULT_PINATA_GATEWAY = 'gateway.pinata.cloud';

export const IPFS_GATEWAY_HOSTNAME =
	import.meta.env.VITE_PINATA_GATEWAY_HOSTNAME || DEFAULT_PINATA_GATEWAY;

export function assumeIpfsHash(cid: string) {
	return cid.startsWith('Qm') || cid.startsWith('baf');
}

export const ipfsCidUrl = (hash: string) => {
	hash = hash.match(/\/ipfs\/\w+$/) ? hash.match(/\w+$/)?.[0] : hash;
	return `https://${IPFS_GATEWAY_HOSTNAME}/ipfs/${hash}`;
};

export const ipfsUrlToCid = (url: string) => {
	return url.replace(/^https:\/\/[^/]+\/ipfs\//, '');
};