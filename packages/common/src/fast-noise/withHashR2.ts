export const withHashR2 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
): number => {
	let hash = seed ^ xPrimed ^ yPrimed;
	hash = Math.imul(hash, 0x27d4eb2d);
	return hash;
};
