import { external } from "@aminnairi/rollup-plugin-external";
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
			//
		],
		plugins: [
			resolve(),
			commonjs(),
			external({
				include: [
					"@hookform/resolvers/zod",
					"@lexical/list",
					"@lexical/react/LexicalAutoFocusPlugin",
					"@lexical/react/LexicalComposer",
					"@lexical/react/LexicalComposerContext",
					"@lexical/react/LexicalContentEditable",
					"@lexical/react/LexicalErrorBoundary",
					"@lexical/react/LexicalHistoryPlugin",
					"@lexical/react/LexicalListPlugin",
					"@lexical/react/LexicalRichTextPlugin",
					"@lexical/react/LexicalTabIndentationPlugin",
					"react/jsx-runtime",
				],
			}),
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
		external: [
			//
		],
	},
];
