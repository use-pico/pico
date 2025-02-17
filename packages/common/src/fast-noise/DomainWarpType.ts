export const DomainWarpType = Object.freeze({
	OpenSimplex2: "OpenSimplex2",
	OpenSimplex2Reduced: "OpenSimplex2Reduced",
	BasicGrid: "BasicGrid",
});

export type DomainWarpType =
	(typeof DomainWarpType)[keyof typeof DomainWarpType];
