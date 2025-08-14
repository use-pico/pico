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
					"group",
					"relative",
					"cursor-pointer",
				]),
				label: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"rounded-sm",
						"px-2",
						"py-1",
						"border",
						"border-b-2",
						"border-transparent",
						"transition-all",
						"duration-200",
					],
					[
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
						"opacity-0",
						"scale-95",
						"absolute",
						"group-hover:opacity-100",
						"group-hover:scale-100",
						"transition-all",
						"duration-200",
						"shadow-md",
						"z-20",
						"px-4",
						"py-2",
						"pointer-events-none",
						"group-hover:pointer-events-auto",
					],
					[
						"tone.primary.light.bg",
						"tone.primary.light.border",
					],
				),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					label: what.token([
						"tone.primary.dark.text",
						"tone.primary.dark.bg",
						"tone.primary.dark.border",
						"tone.primary.dark.shadow",
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
