export const withAlphaComposite = (
	[rB, gB, bB, aB]: [
		number,
		number,
		number,
		number,
	],
	[rT, gT, bT, aT]: [
		number,
		number,
		number,
		number,
	],
): [
	number,
	number,
	number,
	number,
] => {
	const outA = aT + aB * (1 - aT);
	if (outA < 1e-6) {
		return [
			0,
			0,
			0,
			0,
		];
	}

	const outR = (rT * aT + rB * aB * (1 - aT)) / outA;
	const outG = (gT * aT + gB * aB * (1 - aT)) / outA;
	const outB = (bT * aT + bB * aB * (1 - aT)) / outA;

	return [
		outR,
		outG,
		outB,
		outA,
	];
};
