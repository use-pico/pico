import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FulltextCls = PicoCls.extend({
	slots: [
		"base",
		"search",
		"input",
		"clear",
	],
	root: {
		base: {
			class: [
				"relative",
				"w-full",
			],
		},
		search: {
			class: [
				"absolute",
				"inset-y-0",
				"left-2",
				"flex",
				"items-center",
				"pointer-events-none",
				"text-slate-500",
			],
		},
		input: {
			class: [
				"pl-8",
				"py-1",
				"w-full",
				"bg-slate-50",
				"text-slate-900",
				"text-sm",
				"border",
				"border-slate-300",
				"rounded-sm",
				"focus:border-sky-400",
				"focus:outline-hidden",
				"block",
			],
		},
		clear: {
			class: [
				"absolute",
				"inset-y-0",
				"right-2",
				"flex",
				"items-center",
				"cursor-pointer",
				"text-slate-300",
				"hover:text-slate-500",
			],
		},
	},
});

export type FulltextCls = typeof FulltextCls;

export namespace FulltextCls {
	export type Props<P = unknown> = Component<typeof FulltextCls, P>;
}
