import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TooltipCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"border",
						"border-sky-400",
						"bg-sky-50",
						"text-sky-600",
						"rounded-lg",
						"px-4",
						"py-2",
						"shadow-md",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type TooltipCls = typeof TooltipCls;

export namespace TooltipCls {
	export type Props<P = unknown> = Component<typeof TooltipCls, P>;
}
