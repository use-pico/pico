import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			vertical: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
				]),
			}),
			rule(
				{
					vertical: true,
				},
				{
					base: classes([
						"flex-col",
						"items-start",
					]),
				},
			),
		],
		defaults: {
			vertical: false,
		},
	},
);

export namespace MenuCls {
	export type Props<P = unknown> = Component<typeof MenuCls, P>;
}
