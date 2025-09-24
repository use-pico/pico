import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
	content: [
		"../../packages/**/*.{ts,tsx}",
	],
	plugins: [
		addDynamicIconSelectors(),
	],
};
