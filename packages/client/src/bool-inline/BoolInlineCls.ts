import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { IconCls } from "../icon/IconCls";

export const BoolInlineCls = contract(IconCls.contract)
	.bool("value")
	.def()
	.rule(
		{
			value: true,
		},
		{
			root: {
				token: [
					"tone.secondary.light.text",
				],
			},
		},
	)
	.rule(
		{
			value: false,
		},
		{
			root: {
				token: [
					"tone.warning.light.text",
				],
			},
		},
	)
	.defaults({
		tone: "primary",
		theme: "light",
		disabled: false,
		size: "md",
		value: false,
	})
	.cls();

export type BoolInlineCls = typeof BoolInlineCls;

export namespace BoolInlineCls {
	export type Props<P = unknown> = Cls.Props<BoolInlineCls, P>;
}
