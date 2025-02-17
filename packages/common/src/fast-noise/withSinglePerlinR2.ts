import { PrimeX } from "./PrimeX";
import { PrimeY } from "./PrimeY";
import { withGradCoordR2 } from "./withGradCoordR2";
import { withInterpQuintic } from "./withInterpQuintic";
import { withLerp } from "./withLerp";

export const withSinglePerlinR2 = (
	seed: number,
	x: number,
	y: number,
): number => {
	let x0 = Math.floor(x);
	let y0 = Math.floor(y);

	const xd0 = x - x0;
	const yd0 = y - y0;
	const xd1 = xd0 - 1;
	const yd1 = yd0 - 1;

	const xs = withInterpQuintic(xd0);
	const ys = withInterpQuintic(yd0);

	x0 = Math.imul(x0, PrimeX);
	y0 = Math.imul(y0, PrimeY);
	const x1 = x0 + PrimeX;
	const y1 = y0 + PrimeY;

	const xf0 = withLerp(
		withGradCoordR2(seed, x0, y0, xd0, yd0),
		withGradCoordR2(seed, x1, y0, xd1, yd0),
		xs,
	);
	const xf1 = withLerp(
		withGradCoordR2(seed, x0, y1, xd0, yd1),
		withGradCoordR2(seed, x1, y1, xd1, yd1),
		xs,
	);

	return withLerp(xf0, xf1, ys) * 1.4247691104677813;
};
