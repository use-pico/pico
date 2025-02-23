export const ChunkBorsh = Object.freeze({
	struct: {
		id: "string",
		x: "i32",
		z: "i32",
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
