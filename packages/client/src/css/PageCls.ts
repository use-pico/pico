import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PageCls = PicoCls.component({
	slots: [
		"base",
	],
	root: {
		base: {
			class: [
				"flex",
				"flex-col",
				"gap-2",
			],
		},
	},
});

export type PageCls = typeof PageCls;

export namespace PageCls {
	export type Props<P = unknown> = Component<typeof PageCls, P>;
}
