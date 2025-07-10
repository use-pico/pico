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
			"@apollo/client",
			"@graphql-typed-document-node/core",
			"@paralleldrive/cuid2",
			"@tanstack/zod-adapter",
			"axios-rate-limit",
			"axios",
			"kysely",
			"luxon",
			"preferred-locale",
			"build-url-ts",
			"fast-clean",
			"flattie",
			"is-callable",
			"is-empty",
			"is-string",
			"js-sha256",
			"object-path",
			"path-to-regexp",
			"read-excel-file",
			"tailwind-merge",
			"timer-node",
			"zod",
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
