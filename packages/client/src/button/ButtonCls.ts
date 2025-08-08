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
	{
		token: {
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
		},
		rule: [
			{
				slot: {
					base: {
						class: [
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
						],
					},
				},
			},
			{
				match: {
					variant: "primary",
				},
				slot: {
					base: {
						token: [
							"primary.textColor.default",
							"primary.textColor.hover",
						],
					},
				},
			},
			{
				match: {
					variant: "secondary",
				},
				slot: {
					base: {
						token: [
							"secondary.textColor.default",
							"secondary.textColor.hover",
						],
					},
				},
			},
			{
				match: {
					disabled: true,
				},
				slot: {
					base: {
						class: [
							"cursor-not-allowed",
							"opacity-50",
							"hover:opacity-50",
						],
					},
				},
			},
		],
		defaults: {
			variant: "primary",
			disabled: false,
			size: "md",
			borderless: false,
		},
	},
);

export namespace ButtonCls {
	export type Props<P = unknown> = Component<typeof ButtonCls, P>;
}
