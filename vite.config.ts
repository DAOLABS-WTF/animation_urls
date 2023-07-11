import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 4173,
	},
	resolve: {
		alias: {
			$stores: path.resolve('./src/stores'),
			$utils: path.resolve('./src/utils'),
			$assets: path.resolve('./src/assets'),
			$constants: path.resolve('./src/constants'),
			$models: path.resolve('./src/models'),
			$data: path.resolve('./src/data'),
			$routes: path.resolve('./src/routes'),
			crypto: 'crypto-browserify',
			stream: 'stream-browserify',
			assert: 'assert',
			'@coinbase/wallet-sdk': '@coinbase/wallet-sdk/dist/index.js'
		}
	}
};

export default config;
