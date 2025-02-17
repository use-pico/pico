import { withHashR3 } from "./withHashR3";

export const withValCoordR3 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
	zPrimed: number,
): number => {
	let hash = withHashR3(seed, xPrimed, yPrimed, zPrimed);

	hash = Math.imul(hash, hash);
	hash ^= hash << 19;
	return hash * (1 / 2147483648.0);
};
