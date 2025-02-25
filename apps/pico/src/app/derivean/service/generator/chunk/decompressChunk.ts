import { deserialize } from "borsh";
import { decompressSync } from "fflate";
import { ChunkBorsh } from "~/app/derivean/service/generator/chunk/ChunkBorsh";
import type { Chunk } from "~/app/derivean/type/Chunk";

export const decompressChunk = (data: Uint8Array): Chunk.Data => {
	return deserialize(ChunkBorsh, decompressSync(data)) as Chunk.Data;
};
