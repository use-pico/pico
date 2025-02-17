export const withCubicLerp = (
	a: number,
	b: number,
	c: number,
	d: number,
	t: number,
): number => {
	const p = d - c - (a - b);
	return t * t * t * p + t * t * (a - b - p) + t * (c - a) + b;
};
