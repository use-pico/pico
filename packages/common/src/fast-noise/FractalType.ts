export const FractalType = Object.freeze({
	None: "None",
	FBm: "FBm",
	Ridged: "Ridged",
	PingPong: "PingPong",
	DomainWarpProgressive: "DomainWarpProgressive",
	DomainWarpIndependent: "DomainWarpIndependent",
});

export type FractalType = (typeof FractalType)[keyof typeof FractalType];
