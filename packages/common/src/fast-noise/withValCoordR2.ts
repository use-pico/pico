import { withHashR2 } from "./withHashR2";

export const withValCoordR2 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
): number => {
	let hash = withHashR2(seed, xPrimed, yPrimed);

	hash = Math.imul(hash, hash);
	hash ^= hash << 19;
	return hash * (1 / 2147483648.0);
};
