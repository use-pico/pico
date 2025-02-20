export const ChunkBorsh = Object.freeze({
	struct: {
		id: "string",
		x: "i32",
		z: "i32",
		tiles: {
			array: {
				type: {
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
				},
			},
		},
		texture: {
			struct: {
				size: "i32",
				data: {
					array: {
						type: "u8",
					},
				},
			},
		},
	},
});
