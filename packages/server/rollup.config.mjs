import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

/** @type {import('rollup').RollupOptions[]} */
export default [
	// ESM build
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.js",
			format: "esm",
			sourcemap: true,
		},
		treeshake: false,
		external: [
			"@phenomnomnominal/tsquery",
			"@use-pico/common",
			"axios",
			"yaml",
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				declaration: false,
				sourceMap: true,
			}),
		],
	},
	// DTS build
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.d.ts",
			format: "esm",
		},
		plugins: [
			dts(),
		],
	},
];
