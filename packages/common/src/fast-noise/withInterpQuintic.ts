export const withInterpQuintic = (t: number): number => {
	return t * t * t * (t * (t * 6 - 15) + 10);
};
