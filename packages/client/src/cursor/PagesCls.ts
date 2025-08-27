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
					"gap-3",
				]),
				page: what.both(
					[
						"flex",
						"items-center",
						"justify-center",
						"cursor-pointer",
						"transition-all",
						"duration-200",
						"hover:shadow-sm",
					],
					[
						"scale.sm",
						"border.default",
						"round.default",
						"padding.sm",
						"tone.neutral.light.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow:hover",
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
							"scale-120",
							"hover:scale-120",
						],
						[
							"shadow.sm",
							"tone.neutral.light.text",
							"tone.neutral.light.bg",
							"tone.neutral.light.border",
							"tone.neutral.light.border:hover",
							"tone.neutral.light.shadow",
							"tone.neutral.light.shadow:hover",
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
