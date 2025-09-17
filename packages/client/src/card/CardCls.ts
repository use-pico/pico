import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CardCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
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
				root: what.both(
					[
						"Card-root",
						"flex",
						"flex-col",
						"gap-4",
					],
					[
						"border.default",
						"round.default",
						"shadow.default",
						"square.lg",
						// "tone.neutral.light.bg",
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					inline: true,
				}),
				{
					root: what.both(
						[
							"inline-flex",
							"flex-row",
							"gap-2",
						],
						[
							"square.md",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			inline: false,
			tone: "unset",
			theme: "unset",
		}),
	}),
);

export type CardCls = typeof CardCls;

export namespace CardCls {
	export type Props<P = unknown> = Cls.Props<CardCls, P>;
}
