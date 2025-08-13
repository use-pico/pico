import type { Component } from "@use-pico/cls";
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
		token: {},
		rules: [
			def.rule(
				what.variant({
					value: true,
				}),
				{
					root: what.css([
						"text-green-600",
					]),
				},
			),
			def.rule(
				what.variant({
					value: false,
				}),
				{
					root: what.css([
						"text-amber-600",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			size: "xl",
			value: false,
		}),
	}),
);

export type BoolInlineCls = typeof BoolInlineCls;

export namespace BoolInlineCls {
	export type Props<P = unknown> = Component<BoolInlineCls, P>;
}
