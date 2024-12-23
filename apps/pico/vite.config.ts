import ViteYaml from "@modyfi/vite-plugin-yaml";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import paths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			generatedRouteTree: "./src/_route.ts",
			routesDirectory: "./src/@routes",
		}),
		paths(),
		react(),
		ViteYaml() as any,
		dynamicImport(),
	],
	base: "/pico/",
	server: {
		port: 4000,
	},
});
