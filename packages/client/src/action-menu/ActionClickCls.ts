import type { Cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = ActionCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: {},
		rules: [],
		defaults: def.defaults({
			loading: false,
			disabled: false,
			tone: "neutral",
			theme: "light",
		}),
	}),
);

export type ActionClickCls = typeof ActionClickCls;

export namespace ActionClickCls {
	export type Props<P = unknown> = Cls.Props<typeof ActionClickCls, P>;
}
