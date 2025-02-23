import { serialize } from "borsh";
import { deflateSync } from "fflate";
import { ChunkBorsh } from "~/app/derivean/service/generator/ChunkBorsh";
import type { Chunk } from "~/app/derivean/type/Chunk";

export const compressChunk = (chunk: Chunk.Data): Uint8Array => {
	return deflateSync(serialize(ChunkBorsh, chunk), {
		level: 9,
	});
};
