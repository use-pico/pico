import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuGroupCls = PicoCls.extend(
	{
		tokens: {},
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
					"pico--menu-group",
					"group",
					"relative",
					"cursor-pointer",
				]),
				label: what.css([
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
					"hover:text-(--color-text-hover)",
					"hover:bg-(--color-bg-hover)",
					"hover:border-(--color-border-hover)",
				]),
				items: what.css([
					"flex",
					"flex-col",
					"w-max",
					"gap-2",
					"invisible",
					"absolute",
					"group-hover:visible",
					"shadow-md",
					"z-20",
					"bg-white",
					"px-4",
					"py-2",
				]),
			}),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					label: what.css([
						"bg-(--color-active-bg)",
						"border-(--color-active-border)",
						"hover:border-(--color-active-border-hover)",
						"hover:text-(--color-active-text-hover)",
						"text-(--color-active-text)",
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
