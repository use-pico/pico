import type { Cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = ActionCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({}),
		rules: [],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			disabled: false,
			loading: false,
		}),
	}),
);

export type ActionLinkCls = typeof ActionLinkCls;

export namespace ActionLinkCls {
	export type Props<P = unknown> = Cls.Props<ActionLinkCls, P>;
}
