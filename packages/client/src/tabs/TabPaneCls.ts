import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TabPaneCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {
			hidden: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				base: classes([]),
			}),
			rule(
				{
					hidden: true,
				},
				{
					base: classes([
						"hidden",
					]),
				},
			),
		],
		defaults: {
			hidden: false,
		},
	},
);

export type TabPaneCls = typeof TabPaneCls;

export namespace TabPaneCls {
	export type Props<P = unknown> = Component<TabPaneCls, P>;
}
