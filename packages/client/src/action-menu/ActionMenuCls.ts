import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ActionMenuCls = PicoCls.extend(
	{
		slot: [
			"base",
		],
		tokens: {},
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"pico--action-menu-base",
						"p-1",
						"border",
						"rounded-sm",
						"shadow-md",
						"flex",
						"flex-col",
						"gap-2",
						"bg-(--pico-bg-default)",
						"text-(--pico-text-default)",
						"border-(--pico-border-default)",
					],
				},
			}),
		],
		defaults: {},
	},
);

export namespace ActionMenuCls {
	export type Props<P = unknown> = Component<typeof ActionMenuCls, P>;
}
