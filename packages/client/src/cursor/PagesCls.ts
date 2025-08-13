import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PagesCls = PicoCls.extend(
	{
		tokens: [],
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
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"select-none",
				]),
				list: what.css([
					"flex",
					"items-center",
					"-space-x-px",
					"text-xs",
					"gap-2",
				]),
				page: what.both(
					[
						"flex",
						"items-center",
						"justify-center",
						"w-12",
						"px-2",
						"py-1",
						"rounded-sm",
						"border",
						"cursor-pointer",
						"transition-all",
						"duration-200",
						"hover:scale-110",
						"active:scale-95",
					],
					[
						"tone.subtle.dark.text",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
					],
				),
			}),
			def.rule(
				what.variant({
					current: true,
				}),
				{
					page: what.both(
						[
							"font-bold",
							"shadow-sm",
							"scale-110",
						],
						[
							"tone.subtle.dark.text",
							"tone.subtle.dark.bg",
							"tone.subtle.dark.border",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			current: false,
		}),
	}),
);
export type PagesCls = typeof PagesCls;

export namespace PagesCls {
	export type Props<P = unknown> = Component<PagesCls, P>;
}
