import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PagesCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"list",
			"page",
		],
		variant: {
			current: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([
					"select-none",
				]),
				list: classes([
					"flex",
					"items-center",
					"-space-x-px",
					"text-xs",
					"gap-2",
				]),
				page: classes([
					"flex",
					"items-center",
					"justify-center",
					"w-12",
					"px-2",
					"py-1",
					"rounded-sm",
					"border",
					"border-slate-200",
					"hover:bg-slate-200",
					"cursor-pointer",
					"transition-all",
					"duration-200",
				]),
			}),
			rule(
				{
					current: true,
				},
				{
					page: classes([
						"bg-slate-100",
						"hover:bg-slate-200",
						"text-slate-800",
						"font-bold",
					]),
				},
			),
		],
		defaults: {
			current: false,
		},
	},
);
export type PagesCls = typeof PagesCls;

export namespace PagesCls {
	export type Props<P = unknown> = Component<typeof PagesCls, P>;
}
