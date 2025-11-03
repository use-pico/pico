import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "./PicoCls";

export const PageCls = contract(PicoCls.contract)
	.slots([
		"root",
	])
	.def()
	.root({
		root: {
			class: [
				"Page-root",
				"flex",
				"flex-col",
				"gap-2",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = Cls.Props<typeof PageCls, P>;
}
