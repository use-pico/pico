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
		rule: [],
		defaults: {
			disabled: false,
			variant: "danger",
		},
	},
);

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<typeof ActionLinkCls, P>;
}
