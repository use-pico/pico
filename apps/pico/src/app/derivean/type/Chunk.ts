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
	}

	export interface Tile {
		pos: {
			x: number;
			z: number;
		};
		abs: {
			x: number;
			z: number;
		};
		noise: number;
		tile: string;
	}
}

export interface Chunk {
	id: string;
	x: number;
	z: number;
	tiles: Chunk.Tile[];
	texture: {
		size: number;
		data: Uint8Array;
	};
}
