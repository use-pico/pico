import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CardCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
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
						"flex",
						"flex-col",
						"gap-4",
					],
					[
						"square.md",
						"border.default",
						"round.default",
						"tone.neutral.light.border",
					],
				),
			}),
			def.rule(
				what.variant({
					inline: true,
				}),
				{
					base: what.css([
						"flex-row",
						"border-none",
						"gap-1",
						"p-0",
						"flex-1",
					]),
				},
			),
		],
		defaults: def.defaults({
			inline: false,
		}),
	}),
);

export type CardCls = typeof CardCls;

export namespace CardCls {
	export type Props<P = unknown> = Component<CardCls, P>;
}
