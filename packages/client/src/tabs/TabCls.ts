import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			active: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
					"cursor-pointer",
					"text-slate-600",
					"border-sky-400",
					"border",
					"border-b-2",
					"border-transparent",
					"hover:border-b-sky-400",
					"py-1",
					"px-2",
					"rounded",
				]),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					base: what.css([
						"cursor-default",
						"font-semibold",
						"text-slate-800",
						"border-sky-400",
						"bg-sky-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
		}),
	}),
);

export type TabCls = typeof TabCls;

export namespace TabCls {
	export type Props<P = unknown> = Component<TabCls, P>;
}
