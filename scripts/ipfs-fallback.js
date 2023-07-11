import fs from 'fs';

async function main() {
	try {
		fs.copyFileSync('build/200.html', 'build/ipfs-404.html');
		fs.copyFileSync('build/video.html', 'build/video');
	} catch (e) {
		console.error(e.message || e);
	}
}

main();
