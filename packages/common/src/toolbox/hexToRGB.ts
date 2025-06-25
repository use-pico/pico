export function hexToRGB(hex: string): {
	r: number;
	g: number;
	b: number;
} {
	if (!/^#[0-9A-Fa-f]{6}$/gu.test(hex)) {
		throw new Error("Invalid hex format. Expected format: #RRGGBB");
	}

	return {
		r: parseInt(hex.substring(1, 3), 16),
		g: parseInt(hex.substring(3, 5), 16),
		b: parseInt(hex.substring(5, 7), 16),
	};
}
