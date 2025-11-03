import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { MenuItemCls } from "./MenuItemCls";

export const MenuLinkCls = contract(MenuItemCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
		type: "main",
		active: false,
		vertical: false,
	})
	.cls();

export type MenuLinkCls = typeof MenuLinkCls;

export namespace MenuLinkCls {
	export type Props<P = unknown> = Cls.Props<MenuLinkCls, P>;
}
