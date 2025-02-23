import type { GameConfig } from "~/app/derivean/GameConfig";

export const ColorMap: GameConfig.ColorMap[] = [
	/**
	 * Deep Ocean (Dark to Vibrant Blues)
	 */
	{ noise: -1.0, color: "#000022" },
	{ noise: -0.95, color: "#000044" },
	{ noise: -0.9, color: "#001f7f" },
	{ noise: -0.85, color: "#002b9f" },
	{ noise: -0.8, color: "#0037bf" },
	{ noise: -0.75, color: "#0043df" },
	{ noise: -0.7, color: "#0050ff" },
	{ noise: -0.65, color: "#0062ff" },
	{ noise: -0.6, color: "#0074ff" },
	{ noise: -0.55, color: "#0086ff" },
	{ noise: -0.5, color: "#0098ff" },
	/**
	 * Shallow Waters & Beaches (Yellowish Transition)
	 */
	{ noise: -0.45, color: "#00aaff" },
	{ noise: -0.4, color: "#11ccff" },
	{ noise: -0.35, color: "#33ddff" },
	{ noise: -0.3, color: "#55eeff" },
	{ noise: -0.25, color: "#77ffff" },
	{ noise: -0.2, color: "#ccdd77" },
	{ noise: -0.15, color: "#eedd66" },
	{ noise: -0.1, color: "#ffcc44" },
	{ noise: -0.05, color: "#ffaa22" },
	/**
	 * Grasslands (Vibrant Greens)
	 */
	{ noise: 0.0, color: "#44dd44" },
	{ noise: 0.05, color: "#33cc33" },
	{ noise: 0.1, color: "#22bb22" },
	{ noise: 0.15, color: "#22aa22" },
	{ noise: 0.2, color: "#119911" },
	{ noise: 0.25, color: "#008800" },
	/**
	 * Forests (Dense and Deep Greens)
	 */
	{ noise: 0.3, color: "#007700" },
	{ noise: 0.35, color: "#006600" },
	{ noise: 0.4, color: "#005500" },
	{ noise: 0.45, color: "#004c00" },
	{ noise: 0.5, color: "#004400" },
	{ noise: 0.55, color: "#003b00" },
	{ noise: 0.6, color: "#003300" },
	/**
	 * Hills (Extended Transition)
	 */
	{ noise: 0.65, color: "#778822" },
	{ noise: 0.7, color: "#889933" },
	{ noise: 0.75, color: "#99aa22" },
	{ noise: 0.8, color: "#aaa833" },
	{ noise: 0.85, color: "#bbb844" },
	{ noise: 0.875, color: "#cccc55" },
	{ noise: 0.9, color: "#dddd66" },
	/**
	 * Mountains (Vibrant Rocky Shades)
	 */
	{ noise: 0.925, color: "#666677" },
	{ noise: 0.95, color: "#777788" },
	{ noise: 0.975, color: "#888899" },
	{ noise: 0.99, color: "#aaaaaa" },
	{ noise: 1.0, color: "#ffffff" },
];
