import { type Texture as CoolTexture } from "three";

export namespace Chunk {
	export type Level = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;

	/**
	 * Defines where the given level should be drawn.
	 *
	 * Min/max is (usually is) a zoom level of a camera.
	 */
	export interface Layer {
		/**
		 * Where to draw this layer (zoom)
		 */
		min: number;
		/**
		 * Where to stop drawing this layer (zoom)
		 */
		max: number;
		/**
		 * Scale of this layer (1 = 1x1, 2 = 2x2, 4 = 4:4)
		 *
		 * Must be an integer or everything will blow up.
		 *
		 * Or just listen to what TypeScript thinks.
		 */
		level: Level;
		/**
		 * Offset is used to extend visible area by this number of chunks.
		 *
		 * Keep this number quite low, like 1, 2 or 3. Higher numbers may cause
		 * performance and memory issues.
		 *
		 * List are quite "reasonable" values; you can can over, but you may expect big kaboom.
		 */
		offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	}

	/**
	 * LOD level with precomputed size,position and texture. When used with Texture, it may
	 * be directly used for rendering.
	 */
	interface Base<TTexture extends Uint8Array | CoolTexture> {
		/**
		 * Chunk ID should contain (usually) x/z and level.
		 */
		id: string;
		/**
		 * Chunk size of this level; can be directly used
		 */
		size: number;
		/**
		 * Absolute world position of this chunk, including chunk size
		 */
		x: number;
		/**
		 * Absolute world position of this chunk, including chunk size
		 */
		z: number;
		/**
		 * (LOD) Level of this chunk.
		 */
		level: Level;
		/**
		 * Chunk texture of this chunk
		 */
		texture: {
			/**
			 * Texture size (width and height are the same)
			 */
			size: number;
			/**
			 * Data of a texture; may be pure data buffer or already processed texture.
			 */
			data: TTexture;
		};
	}

	/**
	 * Raw chunk data (can be stored whatever, but for rendering it must be processed).
	 */
	export interface Data extends Base<Uint8Array> {
		//
	}

	/**
	 * Chunk usable for runtime.
	 */
	export interface Runtime extends Base<CoolTexture> {
		//
	}

	export namespace View {
		export interface Level {
			/**
			 * Hash of this view, used to compare if the view has changed.
			 *
			 * That's position and zoom level.
			 */
			hash: string;
			/**
			 * Level of this view.
			 */
			level: Chunk.Level;
			/**
			 * Chunk positions in X axis.
			 */
			x: {
				min: number;
				max: number;
			};
			/**
			 * Chunk positions in Z axis.
			 */
			z: {
				min: number;
				max: number;
			};
			/**
			 * Count of chunks in this view.
			 */
			count: number;
		}
	}

	/**
	 * This is a chunk view, used to determine which chunks are visible, but also serves as
	 * an input for chunk generator.
	 */
	export interface View {
		/**
		 * Levels of this view (based on the user input and camera zoom).
		 *
		 * Because there could be an interpolation between two levels, it's an array.
		 */
		levels: View.Level[];
	}
}
