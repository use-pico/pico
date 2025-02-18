export const EntityBorshSchema = Object.freeze({
	struct: {
		pos: {
			struct: {
				x: "i32",
				z: "i32",
			},
		},
		abs: {
			struct: {
				x: "i32",
				z: "i32",
			},
		},
		noise: "f32",
		tile: "string",
	},
});
