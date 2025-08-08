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
		rule: [
			{
				match: {
					loading: true,
				},
				slot: {
					base: {
						class: [
							"pointer-events-none",
							"opacity-50",
						],
					},
				},
			},
		],
		defaults: {
			disabled: false,
			variant: "common",
			loading: false,
		},
	},
);

export namespace ActionClickCls {
	export type Props<P = unknown> = Component<typeof ActionClickCls, P>;
}
