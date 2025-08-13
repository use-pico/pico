import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonLinkCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
		],
		variant: {
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"px-4",
					"py-2",
					"rounded-md",
					"text-md",
					"text-blue-400",
					"hover:text-blue-600",
				]),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"cursor-not-allowed",
						"text-slate-400",
						"hover:text-slate-400",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
		}),
	}),
);
export type ButtonLinkCls = typeof ButtonLinkCls;

export namespace ButtonLinkCls {
	export type Props<P = unknown> = Component<ButtonLinkCls, P>;
}
