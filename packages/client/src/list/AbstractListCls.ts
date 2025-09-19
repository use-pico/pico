import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AbstractListCls = contract(PicoCls.contract)
	.slots([
		"root",
		"body",
		"items",
	])
	.def()
	.root({
		root: {
			class: [
				"AbstractList-root",
			],
		},
		body: {
			class: [
				"AbstractList-body",
			],
		},
		items: {
			class: [
				"AbstractList-items",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type AbstractListCls = typeof AbstractListCls;

export namespace AbstractListCls {
	export type Props<P = unknown> = Cls.Props<AbstractListCls, P>;

	export type Slots = Cls.SlotsOf<AbstractListCls>;
}
