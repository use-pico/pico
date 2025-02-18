import { Game } from "~/app/derivean/Game";
import { EntityBorshSchema } from "~/app/derivean/service/generator/EntityBorshSchema";

export const ChunkBorshSchema = Object.freeze({
	struct: {
		id: "string",
		x: "i32",
		z: "i32",
		tiles: {
			array: { type: EntityBorshSchema, len: Game.plotCount ** 2 },
		},
	},
});
