import ViteYaml from "@modyfi/vite-plugin-yaml";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tla from "vite-plugin-top-level-await";
import paths from "vite-tsconfig-paths";

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
	],
	base: "/pico/",
	server: {
		port: 4000,
	},
	build: {
		target: "esnext",
	},
	optimizeDeps: {
		exclude: ["sql.js"],
	},
});
