export const TransformType3D = Object.freeze({
	None: "None",
	ImproveXYPlanes: "ImproveXYPlanes",
	ImproveXZPlanes: "ImproveXZPlanes",
	DefaultOpenSimplex2: "DefaultOpenSimplex2",
});

export type TransformType3D =
	(typeof TransformType3D)[keyof typeof TransformType3D];
