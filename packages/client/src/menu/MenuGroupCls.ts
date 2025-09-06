import type { Cls } from "@use-pico/cls";
import { MenuItemCls } from "./MenuItemCls";

export const MenuGroupCls = MenuItemCls.extend(
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

export type MenuGroupCls = typeof MenuGroupCls;

export namespace MenuGroupCls {
	export type Props<P = unknown> = Cls.Props<MenuGroupCls, P>;
}
