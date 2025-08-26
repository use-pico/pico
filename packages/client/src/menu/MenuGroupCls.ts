import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuGroupCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"label",
			"items",
		],
		variant: {
			active: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"cursor-pointer",
				]),
				label: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"px-2",
						"py-1",
						"border-transparent",
						"transition-all",
						"duration-200",
						"cursor-pointer",
					],
					[
						"border.default",
						"round.default",
						"scale.default",
						"tone.primary.light.text:hover",
						"tone.primary.light.bg:hover",
						"tone.primary.light.border:hover",
						"tone.primary.light.shadow:hover",
					],
				),
				items: what.both(
					[
						"flex",
						"flex-col",
						"w-max",
						"gap-2",
						"px-4",
						"py-4",
					],
					[
						"border.default",
						"round.default",
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.light.shadow",
						"shadow.md",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					label: what.token([
						"tone.primary.light.text",
						"tone.primary.light.bg",
						"tone.primary.light.border",
						"tone.primary.light.shadow",
					]),
				},
			),
		],
		defaults: def.defaults({
			active: false,
		}),
	}),
);

export type MenuGroupCls = typeof MenuGroupCls;

export namespace MenuGroupCls {
	export type Props<P = unknown> = Component<MenuGroupCls, P>;
}
