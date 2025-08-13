import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			vertical: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
				]),
			}),
			def.rule(
				what.variant({
					vertical: true,
				}),
				{
					root: what.css([
						"flex-col",
						"items-start",
					]),
				},
			),
		],
		defaults: def.defaults({
			vertical: false,
		}),
	}),
);

export type MenuCls = typeof MenuCls;

export namespace MenuCls {
	export type Props<P = unknown> = Component<MenuCls, P>;
}
