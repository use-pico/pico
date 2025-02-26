/**
 * Colorspace definition, they're only to explicitly mark what kind of color is used.
 */
export namespace Color {
	/**
	 * Standard RGB color.
	 * RGBA (0-255)
	 */
	export interface RGBA {
		type: "rgba";
		color: [number, number, number, number];
	}
	/**
	 * HSLA color.
	 * HSLA (0-360, 0-100, 0-100, 0-1)
	 */
	export interface HSLA {
		type: "hsla";
		color: [number, number, number, number];
	}
}

export const RGBA = (color: [number, number, number, number]): Color.RGBA => {
	return {
		type: "rgba",
		color,
	};
};

export const HSLA = (color: [number, number, number, number]): Color.HSLA => {
	return {
		type: "hsla",
		color,
	};
};
