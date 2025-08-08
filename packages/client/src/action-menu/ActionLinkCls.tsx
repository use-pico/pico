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
		rules: () => [
			{
				slot: {},
			},
		],
		defaults: {},
	},
);

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<typeof ActionLinkCls, P>;
}
