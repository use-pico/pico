import type { Component } from "@use-pico/cls";
import { MenuItemCls } from "./MenuItemCls";

export const MenuLinkCls = MenuItemCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({}),
		rules: [],
		defaults: def.defaults({
			type: "main",
			active: false,
			vertical: false,
		}),
	}),
);

export type MenuLinkCls = typeof MenuLinkCls;

export namespace MenuLinkCls {
	export type Props<P = unknown> = Component<MenuLinkCls, P>;
}
