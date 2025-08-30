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
			tone: "neutral",
			theme: "light",
			loading: false,
		}),
	}),
);

export type ActionLinkCls = typeof ActionLinkCls;

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<ActionLinkCls, P>;
}
