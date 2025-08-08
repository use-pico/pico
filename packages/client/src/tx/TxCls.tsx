import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TxCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [],
				},
			}),
		],
		defaults: {},
	},
);

export type TxCls = typeof TxCls;

export namespace TxCls {
	export type Props<P = unknown> = Component<typeof TxCls, P>;
}
