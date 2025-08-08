import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = ActionCls.extend(
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
			variant: "common",
		},
	},
);

export namespace ActionModalCls {
	export type Props<P = unknown> = Component<typeof ActionModalCls, P>;
}
