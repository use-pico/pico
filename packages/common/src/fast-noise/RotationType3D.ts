export const RotationType3D = Object.freeze({
	None: "None",
	ImproveXYPlanes: "ImproveXYPlanes",
	ImproveXZPlanes: "ImproveXZPlanes",
});

export type RotationType3D =
	(typeof RotationType3D)[keyof typeof RotationType3D];
