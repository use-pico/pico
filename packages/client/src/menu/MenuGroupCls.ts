import type { Component } from "@use-pico/cls";
import { MenuItemCls } from "./MenuItemCls";

export const MenuGroupCls = MenuItemCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: {},
		rules: [],
		defaults: def.defaults({
			active: false,
			inner: false,
			subtle: false,
			vertical: false,
		}),
	}),
);

export type MenuGroupCls = typeof MenuGroupCls;

export namespace MenuGroupCls {
	export type Props<P = unknown> = Component<MenuGroupCls, P>;
}
