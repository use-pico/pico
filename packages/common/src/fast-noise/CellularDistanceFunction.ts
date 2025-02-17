export const CellularDistanceFunction = Object.freeze({
	Euclidean: "Euclidean",
	EuclideanSq: "EuclideanSq",
	Manhattan: "Manhattan",
	Hybrid: "Hybrid",
});

export type CellularDistanceFunction =
	(typeof CellularDistanceFunction)[keyof typeof CellularDistanceFunction];
