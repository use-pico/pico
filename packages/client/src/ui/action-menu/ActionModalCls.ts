import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = contract(ActionCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		loading: false,
	})
	.cls();

export type ActionModalCls = typeof ActionModalCls;

export namespace ActionModalCls {
	export type Props<P = unknown> = Cls.Props<ActionModalCls, P>;
}
