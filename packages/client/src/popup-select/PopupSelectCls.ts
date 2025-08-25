import type { Component, ComponentSlots } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PopupSelectCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"input",
			"content",
		],
		variant: {
			loading: [
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
				base: what.css([
					"flex",
					"flex-col",
					"gap-2",
				]),
				input: what.both(
					[
						"py-2",
						"px-2",
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"cursor-pointer",
						"transition-all",
						"duration-100",
					],
					[
						"border.default",
						"round.default",
						"focus.off",
						"scale.md",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border",
						"tone.neutral.light.text",
						"tone.neutral.light.text:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					input: what.both(
						[
							"cursor-progress",
						],
						[
							"tone.neutral.light.text",
						],
					),
				},
			),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					input: what.both(
						[],
						[
							"tone.neutral.light.bg",
							"tone.neutral.light.text:hover",
							"tone.neutral.light.bg:hover",
							"tone.neutral.light.text:hover",
						],
					),
				},
			),
		],
		defaults: def.defaults({
			loading: false,
			selected: false,
		}),
	}),
);

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Component<PopupSelectCls, P>;

	export type Slots = ComponentSlots<PopupSelectCls>;
}
