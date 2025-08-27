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
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"px-2",
						"py-1",
						"group",
						"transition-all",
					],
					[
						"shadow.sm",
						"border.default",
						"round.default",
						"tone.neutral.light.border",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
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
		],
		defaults: def.defaults({
			inline: false,
		}),
	}),
);

export type ValueOfCls = typeof ValueOfCls;

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<ValueOfCls, P>;
}
