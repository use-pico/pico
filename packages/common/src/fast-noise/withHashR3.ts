export const withHashR3 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
	zPrimed: number,
): number => {
	let hash = seed ^ xPrimed ^ yPrimed ^ zPrimed;
	hash = Math.imul(hash, 0x27d4eb2d);
	return hash;
};
