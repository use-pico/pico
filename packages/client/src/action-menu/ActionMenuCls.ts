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
						"flex",
						"flex-col",
						"gap-2",
					],
					[
						"tone.subtle.light.bg",
						"tone.subtle.light.border",
						"tone.subtle.dark.shadow",
						"round.default",
						"square.md",
						"shadow.md",
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
