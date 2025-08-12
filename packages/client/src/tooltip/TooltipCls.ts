import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TooltipCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.both(
					[
						"border",
						"rounded-lg",
						"px-4",
						"py-2",
						"shadow-md",
					],
					[
						"secondary.color.text-light",
						"secondary.color.bg-dark",
						"secondary.color.border-dark",
						"secondary.color.shadow-dark",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type TooltipCls = typeof TooltipCls;

export namespace TooltipCls {
	export type Props<P = unknown> = Component<TooltipCls, P>;
}
