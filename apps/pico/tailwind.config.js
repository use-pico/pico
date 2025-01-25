import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
	important: true,
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,jsx,ts,tsx}", "../../packages/**/*.{ts,tsx}"],
	plugins: [addDynamicIconSelectors()],
};
