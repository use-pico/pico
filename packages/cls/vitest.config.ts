import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		react(),
	],
	// Vite optimizations for faster builds
	build: {
		target: "esnext",
		minify: false, // Disable minification for faster builds
	},
	// Optimize dependencies
	optimizeDeps: {
		include: [
			"vitest",
			"@vitejs/plugin-react",
		],
	},
	// Cache directory for better performance
	cacheDir: "./node_modules/.vite",
	test: {
		environment: "jsdom",
		setupFiles: [
			"./test/setup.ts",
		],
		globals: true,
		include: [
			"test/**/*.test.ts",
			"test/**/*.test.tsx",
		],
		passWithNoTests: true,
		isolate: false,
		sequence: {
			shuffle: false,
		},
		coverage: {
			enabled: false,
		},
		ui: false,
	},
});
