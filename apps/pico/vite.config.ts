import ViteYaml from "@modyfi/vite-plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tla from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import paths from "vite-tsconfig-paths";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	clearScreen: false,
	plugins: [
		TanStackRouterVite({
			generatedRouteTree: "./src/_route.ts",
			routesDirectory: "./src/@routes",
		}),
		tla(),
		paths(),
		react({}),
		ViteYaml(),
		dynamicImport(),
		wasm(),
		tailwindcss(),
	],
	worker: {
		format: "es",
	},
	envPrefix: ["VITE_", "TAURI_ENV_*"],
	server: {
		strictPort: true,
		host: host || false,
		port: 4000,
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
	build: {
		rollupOptions: {
			external: ["worker_threads", "os", "child_process"],
		},
		target: "esnext",
		// target:
		// 	process.env.TAURI_ENV_PLATFORM === "windows" ? "chrome105" : "safari13",
		// minify: process.env.TAURI_ENV_DEBUG ? false : "esbuild",
		// sourcemap: Boolean(process.env.TAURI_ENV_DEBUG),
	},
	optimizeDeps: {
		exclude: ["sqlocal", "lru-cache"],
	},
});
