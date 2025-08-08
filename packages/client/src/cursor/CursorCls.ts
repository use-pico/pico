import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const CursorCls = PicoCls.component({
	slots: [
		"base",
		"sums",
	],
	root: {
		base: {
			class: [
				"flex",
				"items-center",
				"justify-between",
				"gap-2",
			],
		},
		sums: {
			class: [
				"flex",
				"items-center",
				"gap-2",
				"text-sm",
			],
		},
	},
});
export type CursorCls = typeof CursorCls;

export namespace CursorCls {
	export type Props<P = unknown> = Component<typeof CursorCls, P>;
}
