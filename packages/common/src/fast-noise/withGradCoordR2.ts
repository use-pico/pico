import { Gradients2D } from "./Gradients2D";
import { withHashR2 } from "./withHashR2";

export const withGradCoordR2 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
	xd: number,
	yd: number,
): number => {
	let hash = withHashR2(seed, xPrimed, yPrimed);
	hash ^= hash >> 15;
	hash &= 127 << 1;

	const xg = Gradients2D[hash]!;
	const yg = Gradients2D[hash | 1]!;

	return xd * xg + yd * yg;
};
