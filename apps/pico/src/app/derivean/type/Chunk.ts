export namespace Chunk {
	export type Lightweight = Omit<Chunk, "tiles">;

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
