import type { Component } from "@use-pico/cls";
import { IconCls } from "../icon/IconCls";

export const BoolInlineCls = IconCls.extend(
	{
		tokens: {},
		slot: [],
		variant: {
			value: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ rule }) => [
			rule(
				{
					value: true,
				},
				{
					base: {
						class: [
							"text-green-600",
						],
					},
				},
			),
			rule(
				{
					value: false,
				},
				{
					base: {
						class: [
							"text-amber-600",
						],
					},
				},
			),
		],
		defaults: {
			disabled: false,
			size: "xl",
			value: false,
		},
	},
);

export namespace BoolInlineCls {
	export type Props<P = unknown> = Component<typeof BoolInlineCls, P>;
}
