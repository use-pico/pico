import { type Texture as CoolTexture } from "three";

export namespace Chunk {
	export type Lightweight = Omit<Chunk, "tiles">;

	export interface Texture {
		chunk: Chunk.Lightweight;
		texture: CoolTexture;
	}

	export interface Hash {
		hash: string;
		minX: number;
		maxX: number;
		minZ: number;
		maxZ: number;
		count: number;
		level: number;
	}
}

export interface Chunk {
	id: string;
	x: number;
	z: number;
	texture: {
		size: number;
		data: Uint8Array;
	};
}
