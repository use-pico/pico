export const withLerp = (a: number, b: number, t: number): number => {
	return a + t * (b - a);
};
