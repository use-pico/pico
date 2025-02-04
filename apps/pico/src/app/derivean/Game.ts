/**
 * Plot size in pixels.
 */
const plot = 256;
/**
 * Number of plots in one row; a land is plots x plots in size.
 */
const plots = 16;
/**
 * Size of the land in pixels.
 */
const land = plot * plots;
/**
 * World size in lands; lands x lands in size.
 *
 * Be careful as this number may significantly affect performance and database size.
 */
const world = 24;

/**
 * Because game is sensitive to various pre-defined sizes, they must be shared.
 */
export const Game = {
	plot: {
		/**
		 * Size of the plot: plot is basically smallest buildable unit (building/road)
		 */
		size: plot,
	},
	land: {
		plots,
		/**
		 * Size of the land in pixels.
		 *
		 * x16 basically means number of plots in one row.
		 */
		size: land,
	},
	world: {
		lands: world,
		size: world * land,
	},
} as const;
