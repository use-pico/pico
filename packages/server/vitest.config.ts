import { defineConfig } from "vitest/config";

export default defineConfig({
	// Vite optimizations for faster builds
	build: {
		target: "esnext",
		minify: false, // Disable minification for faster builds
	},
	// Optimize dependencies
	optimizeDeps: {
		include: [
			"vitest",
		],
	},
	// Cache directory for better performance
	cacheDir: "./node_modules/.vite",
	test: {
		environment: "node",
		setupFiles: [
			"./test/setup.ts",
		],
		globals: true,
		include: [
			"test/**/*.test.ts",
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
