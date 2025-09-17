import type { Cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = ActionCls.extend(
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
			loading: false,
			disabled: false,
		}),
	}),
);

export type ActionClickCls = typeof ActionClickCls;

export namespace ActionClickCls {
	export type Props<P = unknown> = Cls.Props<typeof ActionClickCls, P>;
}
