import ViteYaml from "@modyfi/vite-plugin-yaml";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tla from "vite-plugin-top-level-await";
import paths from "vite-tsconfig-paths";
import wasm from "vite-plugin-wasm";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			generatedRouteTree: "./src/_route.ts",
			routesDirectory: "./src/@routes",
		}),
		tla(),
		paths(),
		react(),
		ViteYaml() as any,
		dynamicImport(),
        wasm(),
	],
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
