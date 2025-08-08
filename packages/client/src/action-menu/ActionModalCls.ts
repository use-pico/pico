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
		rules: () => [
			{
				slot: {},
			},
		],
		defaults: {},
	},
);

export namespace ActionModalCls {
	export type Props<P = unknown> = Component<typeof ActionModalCls, P>;
}
