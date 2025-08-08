import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FloatCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"target",
			"portal",
		],
		variant: {
			mounted: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ root, rule, classes }) => [
			root({
				target: classes([
					"flex",
					"justify-center",
					"items-center",
				]),
				portal: classes([]),
			}),
			rule(
				{
					mounted: false,
				},
				{
					portal: classes([
						"hidden",
					]),
				},
			),
		],
		defaults: {
			mounted: false,
		},
	},
);

export type FloatCls = typeof FloatCls;

export namespace FloatCls {
	export type Props<P = unknown> = Component<typeof FloatCls, P>;
}
