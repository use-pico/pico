import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const SelectCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"input",
			"popup",
			"item",
		],
		variant: {
			disabled: [
				"bool",
			],
			active: [
				"bool",
			],
			selected: [
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
						"cursor-pointer",
						"text-sm",
						"focus:outline-hidden",
						"p-2.5",
						"hover:shadow-md",
						"transition-all",
						"group",
					],
					[
						"border.default",
						"round.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
					],
				),
				input: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
				]),
				popup: what.both(
					[
						"z-50",
						"cursor-pointer",
						"overflow-y-auto",
						"bg-white",
						"shadow-lg",
						"focus:outline-hidden",
					],
					[
						"border.default",
						"round.default",
						"tone.neutral.light.border",
					],
				),
				item: what.css([
					"focus:outline-hidden",
					"py-2",
					"px-2.5",
					"flex",
					"items-center",
					"justify-between",
				]),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.both(
						[
							"cursor-not-allowed",
							"hover:shadow-none",
							"opacity-50",
						],
						[
							"tone.neutral.light.border",
						],
					),
				},
			),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					item: what.token([
						"tone.neutral.light.bg",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					item: what.token([
						"tone.neutral.light.bg:hover",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			selected: false,
			active: false,
		}),
	}),
);

export type SelectCls = typeof SelectCls;

export namespace SelectCls {
	export type Props<P = unknown> = Component<SelectCls, P>;
}
