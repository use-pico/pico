export const NoiseType = Object.freeze({
	OpenSimplex2: "OpenSimplex2",
	OpenSimplex2S: "OpenSimplex2S",
	Cellular: "Cellular",
	Perlin: "Perlin",
	ValueCubic: "ValueCubic",
	Value: "Value",
});

export type NoiseType = (typeof NoiseType)[keyof typeof NoiseType];
