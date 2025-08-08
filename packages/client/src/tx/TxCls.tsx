import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TxCls = PicoCls.component({
	slots: [
		"base",
	],
	root: {
		base: {
			class: [],
		},
	},
});

export type TxCls = typeof TxCls;

export namespace TxCls {
	export type Props<P = unknown> = Component<typeof TxCls, P>;
}
