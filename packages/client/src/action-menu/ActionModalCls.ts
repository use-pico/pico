import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = ActionCls.extend(
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
			tone: "primary",
			theme: "light",
			loading: false,
		}),
	}),
);

export type ActionModalCls = typeof ActionModalCls;

export namespace ActionModalCls {
	export type Props<P = unknown> = Component<ActionModalCls, P>;
}
