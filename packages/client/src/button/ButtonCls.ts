import { type Component, cls } from "@use-pico/cls";

export const ButtonCls = cls(
	{
		tokens: {
			"primary.textColor": [
				"default",
				"hover",
			],
			"secondary.textColor": [
				"default",
				"hover",
			],
		},
		slot: [
			"base",
		],
		variant: {
			variant: [
				"primary",
				"secondary",
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
		token: def.token({
			"primary.textColor": {
				default: [
					"text-blue-600",
				],
				hover: [
					"hover:text-blue-700",
				],
			},
			"secondary.textColor": {
				default: [
					"text-slate-600",
				],
				hover: [
					"hover:text-slate-700",
				],
			},
		}),
		rules: [
			def.root({
				base: what.css([
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
					"shadow-sm",
				]),
			}),
			def.rule(
				what.variant({
					variant: "primary",
				}),
				{
					base: what.token([
						"primary.textColor.default",
						"primary.textColor.hover",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "secondary",
				}),
				{
					base: what.token([
						"secondary.textColor.default",
						"secondary.textColor.hover",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
						"cursor-not-allowed",
						"opacity-50",
						"hover:opacity-50",
					]),
				},
			),
		],
		defaults: def.defaults({
			variant: "primary",
			disabled: false,
			size: "md",
			borderless: false,
		}),
	}),
);

export namespace ButtonCls {
	export type Props<P = unknown> = Component<typeof ButtonCls, P>;
}
