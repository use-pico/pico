import type { Cls } from "@use-pico/cls";
import { IconCls } from "../icon/IconCls";

export const BoolInlineCls = IconCls.extend(
	{
		tokens: [],
		slot: [],
		variant: {
			value: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.rule(
				what.variant({
					value: true,
				}),
				{
					root: what.token([
						"tone.secondary.light.text",
					]),
				},
			),
			def.rule(
				what.variant({
					value: false,
				}),
				{
					root: what.token([
						"tone.warning.light.text",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			size: "md",
			value: false,
			theme: "unset",
			tone: "inherit",
		}),
	}),
);

export type BoolInlineCls = typeof BoolInlineCls;

export namespace BoolInlineCls {
	export type Props<P = unknown> = Cls.Props<BoolInlineCls, P>;
}
