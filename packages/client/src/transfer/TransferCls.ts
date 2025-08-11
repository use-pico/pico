import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TransferCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"panel",
			"group",
			"header",
			"item",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"grid",
					"grid-cols-2",
					"gap-2",
					"select-none",
				]),
				panel: what.css([
					"grow",
					"border",
					"border-slate-200",
					"rounded",
					"p-4",
				]),
				group: what.css([
					"transition-none",
				]),
				header: what.css([
					"font-bold",
				]),
				item: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"p-2",
					"rounded",
					"border-b",
					"border-transparent",
					"hover:border-slate-300",
					"hover:bg-slate-100",
					"cursor-pointer",
					"group",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TransferCls = typeof TransferCls;

export namespace TransferCls {
	export type Props<P = unknown> = Component<typeof TransferCls, P>;
}
