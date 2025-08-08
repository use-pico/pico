import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = ActionCls.variant({
	slots: [],
	variants: {
		loading: [
			"bool",
		],
	},
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
		// TODO Bug here - when using Cls.variant, it does not inherit and force all defaults from parents
		loading: false,
	},
});

export namespace ActionClickCls {
	export type Props<P = unknown> = Component<typeof ActionClickCls, P>;
}
