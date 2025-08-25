import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonLinkCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
		],
		variant: {
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"px-4",
						"py-2",
						"text-md",
					],
					[
						"round.default",
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.both(
						[
							"cursor-not-allowed",
						],
						[
							"tone.neutral.light.text",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
		}),
	}),
);
export type ButtonLinkCls = typeof ButtonLinkCls;

export namespace ButtonLinkCls {
	export type Props<P = unknown> = Component<ButtonLinkCls, P>;
}
