import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const MenuCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.bool("vertical")
	.def()
	.root({
		root: {
			class: [
				"Menu-root",
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
			],
		},
	})
	.match("vertical", true, {
		root: {
			class: [
				"flex-col",
				"items-start",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
		vertical: false,
	})
	.cls();

export type MenuCls = typeof MenuCls;

export namespace MenuCls {
	export type Props<P = unknown> = Cls.Props<MenuCls, P>;
}
