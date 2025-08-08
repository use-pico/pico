import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = ActionCls.extend(
	{
		tokens: {},
		slot: [],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({}),
		],
		defaults: {
			disabled: false,
			variant: "common",
		},
	},
);

export type ActionLinkCls = typeof ActionLinkCls;

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<typeof ActionLinkCls, P>;
}
