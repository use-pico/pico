import type { Component, ComponentSlots } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PopupSelectCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"input",
		],
		variant: {
			isLoading: [
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
				input: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"cursor-pointer",
					"transition-all",
					"duration-100",
				]),
			}),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					input: what.token([
						"tone.neutral.light.bg",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.text:hover",
					]),
				},
			),
		],
		defaults: def.defaults({
			isLoading: false,
			selected: false,
		}),
	}),
);

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Component<PopupSelectCls, P>;

	export type Slots = ComponentSlots<PopupSelectCls>;
}
