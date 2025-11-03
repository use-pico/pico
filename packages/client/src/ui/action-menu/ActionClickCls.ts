import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = contract(ActionCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
		loading: false,
		disabled: false,
	})
	.cls();

export type ActionClickCls = typeof ActionClickCls;

export namespace ActionClickCls {
	export type Props<P = unknown> = Cls.Props<typeof ActionClickCls, P>;
}
