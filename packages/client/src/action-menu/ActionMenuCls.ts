import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionMenuCls = PicoCls.extend(
	{
		slot: [
			"base",
		],
		tokens: [],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"pico--action-menu-base",
						"p-1",
						"border",
						"rounded-sm",
						"shadow-md",
						"flex",
						"flex-col",
						"gap-2",
					],
					[
						"tone.neutral.dark.text",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type ActionMenuCls = typeof ActionMenuCls;

export namespace ActionMenuCls {
	export type Props<P = unknown> = Component<ActionMenuCls, P>;
}
