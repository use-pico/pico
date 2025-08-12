import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ButtonCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
		],
		variant: {
			variant: [
				"primary",
				"secondary",
				"danger",
				"neutral",
				"subtle",
			],
			light: [
				"bool",
			],
			disabled: [
				"bool",
			],
			size: [
				"xs",
				"sm",
				"md",
			],
			borderless: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"flex",
						"flex-row",
						"items-center",
						"justify-center",
						"gap-2",
						"group",
						"rounded-md",
						"transition-all",
						"cursor-pointer",
						"border",
					],
					[
						"shadow.default",
					],
				),
			}),
			def.rule(
				what.variant({
					variant: "primary",
				}),
				{
					root: what.token([
						"primary.color.default",
					]),
				},
			),
		],
		defaults: def.defaults({
			variant: "primary",
			light: false,
			disabled: false,
			size: "md",
			borderless: false,
		}),
	}),
);

export namespace ButtonCls {
	export type Props<P = unknown> = Component<typeof ButtonCls, P>;
}
