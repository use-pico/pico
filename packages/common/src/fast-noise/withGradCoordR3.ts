import { Gradients3D } from "./Gradients3D";
import { withHashR3 } from "./withHashR3";

export const withGradCoordR3 = (
	seed: number,
	xPrimed: number,
	yPrimed: number,
	zPrimed: number,
	xd: number,
	yd: number,
	zd: number,
): number => {
	let hash = withHashR3(seed, xPrimed, yPrimed, zPrimed);
	hash ^= hash >> 15;
	hash &= 63 << 2;

	const xg = Gradients3D[hash]!;
	const yg = Gradients3D[hash | 1]!;
	const zg = Gradients3D[hash | 2]!;

	return xd * xg + yd * yg + zd * zg;
};
