export const ChunkBorsh = Object.freeze({
	struct: {
		id: "string",
		size: "i32",
		x: "i32",
		z: "i32",
		level: "u8",
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
