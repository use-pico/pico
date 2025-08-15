import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BoolInputCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			size: [
				"sm",
				"md",
				"lg",
			],
			tone: [
				"neutral",
				"primary",
				"danger",
				"warning",
			],
			value: [
				"bool",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([]),
			}),
		],
		defaults: def.defaults({
			size: "md",
			tone: "primary",
			value: false,
			disabled: false,
		}),
	}),
);

export type BoolInputCls = typeof BoolInputCls;

export namespace BoolInputCls {
	export type Props<P = unknown> = Component<BoolInputCls, P>;
}
