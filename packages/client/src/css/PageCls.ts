import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PageCls = PicoCls.extend(
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
						"flex",
						"flex-col",
						"gap-2",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = Component<typeof PageCls, P>;
}
