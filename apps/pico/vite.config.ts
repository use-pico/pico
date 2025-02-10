import ViteYaml from "@modyfi/vite-plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tla from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import paths from "vite-tsconfig-paths";

export default defineConfig({
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
	server: {
		port: 4000,
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
	build: {
		target: "esnext",
	},
	optimizeDeps: {
		exclude: ["sqlocal"],
	},
});
