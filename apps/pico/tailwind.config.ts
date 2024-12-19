import { addDynamicIconSelectors } from "@iconify/tailwind";
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{html,js,jsx,ts,tsx}",
		"../../packages/**/*.{ts,tsx}",
	],
	plugins: [addDynamicIconSelectors()],
} satisfies Config;
