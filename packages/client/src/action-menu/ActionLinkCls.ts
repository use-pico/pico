import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = ActionCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: {},
		rules: [],
		defaults: def.defaults({
			disabled: false,
			variant: "common",
		}),
	}),
);

export type ActionLinkCls = typeof ActionLinkCls;

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<ActionLinkCls, P>;
}
