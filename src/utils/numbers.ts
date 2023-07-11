export function getNewRandomNumber(currentNumber: number, min: number, max: number): number {
	const random = Math.round(Math.random() * (max - min) + min);
	if (random === currentNumber) {
		return getNewRandomNumber(random, min, max);
	}
	return random;
}
