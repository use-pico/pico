import dts from "rollup-plugin-dts";

/** @type {import('rollup').RollupOptions[]} */
export default [
	// ESM build
	// {
	// 	input: "src/index.ts",
	// 	output: {
	// 		file: "dist/index.js",
	// 		format: "esm",
	// 		sourcemap: true,
	// 	},
	// 	treeshake: false,
	// 	external: [
	// 		"@floating-ui/react",
	// 		"@hookform/resolvers",
	// 		"@lexical/react",
	// 		"@lexical/utils",
	// 		"@standard-schema/spec",
	// 		"@tanstack/react-query",
	// 		"@tanstack/react-query",
	// 		"@tanstack/react-router",
	// 		"@use-pico/common",
	// 		"axios",
	// 		"js-file-downloader",
	// 		"kysely",
	// 		"lexical",
	// 		"localstorage-slim",
	// 		"luxon",
	// 		"react-dropzone",
	// 		"react-hook-form",
	// 		"react-hot-toast",
	// 		"react",
	// 		"read-excel-file",
	// 		"sqlocal",
	// 		"uuid",
	// 		"write-excel-file",
	// 		"zod",
	// 		"zustand",
	// 	],
	// 	plugins: [
	// 		resolve(),
	// 		commonjs(),
	// 		typescript({
	// 			tsconfig: "./tsconfig.json",
	// 			declaration: false,
	// 			sourceMap: true,
	// 		}),
	// 	],
	// },
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
		external: [
			"@use-pico/common",
		],
	},
];
