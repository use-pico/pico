import { cls } from "../../src/cls";
import type { Component } from "../../src/types";

export const ModernButtonCls = cls(
	{
		tokens: {
			"primary.bgColor": [
				"default",
				"hover",
				"disabled",
			],
			"primary.textColor": [
				"default",
				"hover",
				"disabled",
			],
			"primary.borderColor": [
				"default",
				"hover",
				"disabled",
			],
		},
		slot: [
			"root",
			"label",
			"spinner",
		],
		variant: {
			variant: [
				"primary",
				"secondary",
				"danger",
			],
			size: [
				"sm",
				"md",
				"lg",
			],
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
		},
	},
	{
		token: {
			"primary.bgColor": {
				default: [
					"bg-blue-500",
				],
				hover: [
					"bg-blue-600",
				],
				disabled: [
					"bg-gray-300",
				],
			},
			"primary.textColor": {
				default: [
					"text-white",
				],
				hover: [
					"text-white",
				],
				disabled: [
					"text-gray-500",
				],
			},
			"primary.borderColor": {
				default: [
					"border-blue-500",
				],
				hover: [
					"border-blue-600",
				],
				disabled: [
					"border-gray-300",
				],
			},
		},
		rules: ({ root, rule }) => [
			root({
				root: {
					class: [
						"inline-flex",
						"items-center",
						"justify-center",
						"rounded-md",
						"font-medium",
						"transition-colors",
						"focus:outline-none",
						"focus:ring-2",
						"focus:ring-offset-2",
					],
					token: [
						"primary.bgColor.default",
						"primary.textColor.default",
						"primary.borderColor.default",
					],
				},
				label: {
					class: [
						"font-medium",
					],
				},
				spinner: {
					class: [
						"animate-spin",
						"mr-2",
					],
				},
			}),
			rule(
				{
					variant: "primary",
				},
				{
					root: {
						token: [
							"primary.bgColor.default",
							"primary.textColor.default",
							"primary.borderColor.default",
						],
					},
				},
			),
			rule(
				{
					variant: "secondary",
				},
				{
					root: {
						class: [
							"bg-gray-200",
							"text-gray-900",
							"border-gray-200",
						],
					},
				},
			),
			rule(
				{
					variant: "danger",
				},
				{
					root: {
						class: [
							"bg-red-500",
							"text-white",
							"border-red-500",
						],
					},
				},
			),
			rule(
				{
					size: "sm",
				},
				{
					root: {
						class: [
							"px-3",
							"py-1",
							"text-sm",
						],
					},
				},
			),
			rule(
				{
					size: "md",
				},
				{
					root: {
						class: [
							"px-4",
							"py-2",
							"text-base",
						],
					},
				},
			),
			rule(
				{
					size: "lg",
				},
				{
					root: {
						class: [
							"px-6",
							"py-3",
							"text-lg",
						],
					},
				},
			),
			rule(
				{
					disabled: true,
				},
				{
					root: {
						class: [
							"cursor-not-allowed",
							"opacity-50",
						],
						token: [
							"primary.bgColor.disabled",
							"primary.textColor.disabled",
							"primary.borderColor.disabled",
						],
					},
				},
			),
			rule(
				{
					loading: true,
				},
				{
					root: {
						class: [
							"cursor-wait",
						],
					},
				},
			),
		],
		defaults: {
			variant: "primary",
			size: "md",
			disabled: false,
			loading: false,
		},
	},
);

export namespace ModernButtonCls {
	export type Props<P = unknown> = Component<typeof ModernButtonCls, P>;
}
