import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const CursorCls = contract(PicoCls.contract)
	.slots([
		"root",
		"pages",
		"pages-wrapper",
		"sums",
	])
	.def()
	.root({
		root: {
			class: [
				"Cursor-root",
				"inline-flex",
				"items-center",
				"gap-2",
			],
		},
		pages: {
			class: [
				"Cursor-pages",
				"flex",
				"items-center",
				"justify-center",
				"gap-2",
			],
		},
		"pages-wrapper": {
			class: [
				"Cursor-pages-wrapper",
			],
		},
		sums: {
			class: [
				"Cursor-sums",
				"inline-flex",
				"items-center",
				"gap-2",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type CursorCls = typeof CursorCls;

export namespace CursorCls {
	export type Props<P = unknown> = Cls.Props<CursorCls, P>;
}
