import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = ActionCls.extend(
	{
		tokens: {},
		slot: [],
		variant: {
			loading: [
				"bool",
			],
		},
	},
	{
		token: {},
		rules: ({ rule }) => [
			rule(
				{
					loading: true,
				},
				{
					base: {
						class: [
							"pointer-events-none",
							"opacity-50",
						],
					},
				},
			),
		],
		defaults: {
			loading: false,
			disabled: false,
			variant: "common",
		},
	},
);

export type ActionClickCls = typeof ActionClickCls;

export namespace ActionClickCls {
	export type Props<P = unknown> = Component<typeof ActionClickCls, P>;
}
