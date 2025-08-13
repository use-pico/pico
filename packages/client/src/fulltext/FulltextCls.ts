import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FulltextCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"search",
			"input",
			"clear",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"relative",
					"w-full",
				]),
				search: what.css([
					"absolute",
					"inset-y-0",
					"left-2",
					"flex",
					"items-center",
					"pointer-events-none",
					"text-slate-500",
				]),
				input: what.css([
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
				]),
				clear: what.css([
					"absolute",
					"inset-y-0",
					"right-2",
					"flex",
					"items-center",
					"cursor-pointer",
					"text-slate-300",
					"hover:text-slate-500",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type FulltextCls = typeof FulltextCls;

export namespace FulltextCls {
	export type Props<P = unknown> = Component<FulltextCls, P>;
}
