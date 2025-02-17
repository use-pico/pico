export const withPingPong = (t: number): number => {
	t -= Math.trunc(t * 0.5) * 2;
	return t < 1 ? t : 2 - t;
};
