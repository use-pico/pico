import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ValueOfCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"label",
			"value",
		],
		variant: {
			inline: [
				"bool",
			],
			withBackground: [
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
						"pico--value-of",
						"border",
						"px-2",
						"py-1",
						"rounded-md",
						"group",
					],
					[
						"tone.neutral.light.border",
					],
				),
				label: what.both(
					[
						"text-sm",
						"font-semibold",
						"border-b",
						"mb-2",
					],
					[
						"tone.neutral.light.text",
						"tone.neutral.light.border",
						"tone.neutral.light.border:group-hover",
					],
				),
				value: what.css([]),
			}),
			def.rule(
				what.variant({
					inline: true,
				}),
				{
					base: what.css([
						"border-none",
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
					]),
					label: what.both(
						[
							"mb-0",
							"font-light",
							"text-md",
							"border-none",
						],
						[
							"tone.neutral.light.text",
						],
					),
					value: what.both(
						[
							"text-md",
						],
						[
							"tone.neutral.light.text:hover",
						],
					),
				},
			),
			def.rule(
				what.variant({
					withBackground: true,
				}),
				{
					base: what.both(
						[],
						[
							"tone.neutral.light.bg",
							"tone.neutral.light.bg:hover",
							"tone.neutral.light.border:hover",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			inline: false,
			withBackground: true,
		}),
	}),
);

export type ValueOfCls = typeof ValueOfCls;

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<ValueOfCls, P>;
}
