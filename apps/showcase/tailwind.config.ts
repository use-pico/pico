import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
	content: [
		"../../packages/**/*.{ts,tsx}",
	],
	important: true,
	plugins: [
		addDynamicIconSelectors(),
	],
};
