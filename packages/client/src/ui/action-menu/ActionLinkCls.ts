import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = contract(ActionCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		loading: false,
	})
	.cls();

export type ActionLinkCls = typeof ActionLinkCls;

export namespace ActionLinkCls {
	export type Props<P = unknown> = Cls.Props<ActionLinkCls, P>;
}
