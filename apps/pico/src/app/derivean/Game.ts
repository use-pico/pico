/**
 * Plot size is the size of a single "pixel", that's a building, road or other entity on a map.
 */
const plotSize = 16;
/**
 * Number of plots in a single chunk. Also defines overall texture size, so **be very careful** when changing this value as
 * higher ones may fry your GPU and memory.
 */
const plotCount = 256;
/**
 * Just pre-computed chunk size for easier usage. This is a real texture size generated from noise.
 */
const chunkSize = plotCount * plotSize;

/**
 * Because game is sensitive to various pre-defined sizes, they must be shared.
 */
export const Game = {
	plotSize,
	plotCount,
	chunkSize,
	colorMap: [
		/**
		 * Deep Ocean (Dark to Vibrant Blues)
		 */
		{ level: -1.0, color: "#000022" },
		{ level: -0.95, color: "#000044" },
		{ level: -0.9, color: "#001f7f" },
		{ level: -0.85, color: "#002b9f" },
		{ level: -0.8, color: "#0037bf" },
		{ level: -0.75, color: "#0043df" },
		{ level: -0.7, color: "#0050ff" },
		{ level: -0.65, color: "#0062ff" },
		{ level: -0.6, color: "#0074ff" },
		{ level: -0.55, color: "#0086ff" },
		{ level: -0.5, color: "#0098ff" },
		/**
		 * Shallow Waters & Beaches (Yellowish Transition)
		 */
		{ level: -0.45, color: "#00aaff" },
		{ level: -0.4, color: "#11ccff" },
		{ level: -0.35, color: "#33ddff" },
		{ level: -0.3, color: "#55eeff" },
		{ level: -0.25, color: "#77ffff" },
		{ level: -0.2, color: "#ccdd77" },
		{ level: -0.15, color: "#eedd66" },
		{ level: -0.1, color: "#ffcc44" },
		{ level: -0.05, color: "#ffaa22" },
		/**
		 * Grasslands (Vibrant Greens)
		 */
		{ level: 0.0, color: "#44dd44" },
		{ level: 0.05, color: "#33cc33" },
		{ level: 0.1, color: "#22bb22" },
		{ level: 0.15, color: "#22aa22" },
		{ level: 0.2, color: "#119911" },
		{ level: 0.25, color: "#008800" },
		/**
		 * Forests (Dense and Deep Greens)
		 */
		{ level: 0.3, color: "#007700" },
		{ level: 0.35, color: "#006600" },
		{ level: 0.4, color: "#005500" },
		{ level: 0.45, color: "#004c00" },
		{ level: 0.5, color: "#004400" },
		{ level: 0.55, color: "#003b00" },
		{ level: 0.6, color: "#003300" },
		/**
		 * Hills (Extended Transition)
		 */
		{ level: 0.65, color: "#778822" },
		{ level: 0.7, color: "#889933" },
		{ level: 0.75, color: "#99aa22" },
		{ level: 0.8, color: "#aaa833" },
		{ level: 0.85, color: "#bbb844" },
		{ level: 0.875, color: "#cccc55" },
		{ level: 0.9, color: "#dddd66" },
		/**
		 * Mountains (Vibrant Rocky Shades)
		 */
		{ level: 0.925, color: "#666677" },
		{ level: 0.95, color: "#777788" },
		{ level: 0.975, color: "#888899" },
		{ level: 0.99, color: "#aaaaaa" },
		{ level: 1.0, color: "#ffffff" },
	],
} as const;
