import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { MenuItemCls } from "./MenuItemCls";

export const MenuGroupCls = contract(MenuItemCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
		type: "main",
		active: false,
		vertical: false,
	})
	.cls();

export type MenuGroupCls = typeof MenuGroupCls;

export namespace MenuGroupCls {
	export type Props<P = unknown> = Cls.Props<MenuGroupCls, P>;
}
