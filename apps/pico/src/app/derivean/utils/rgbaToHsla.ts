import { HSLA, type Color } from "~/app/derivean/type/Color";

export const rgbaToHsla = ({ color: [r, g, b, a] }: Color.RGBA): Color.HSLA => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		if (max === r) {
			h = (g - b) / d + (g < b ? 6 : 0);
		} else if (max === g) {
			h = (b - r) / d + 2;
		} else if (max === b) {
			h = (r - g) / d + 4;
		}
		h *= 60;
	}

	return HSLA([h, s * 100, l * 100, a / 255]);
};
