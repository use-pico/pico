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
	({ what, def }) => ({
		token: {},
		rules: [
			def.rule(
				what.variant({
					loading: true,
				}),
				{
					base: what.css([
						"pointer-events-none",
						"opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			loading: false,
			disabled: false,
			variant: "common",
		}),
	}),
);

export type ActionClickCls = typeof ActionClickCls;

export namespace ActionClickCls {
	export type Props<P = unknown> = Component<typeof ActionClickCls, P>;
}
