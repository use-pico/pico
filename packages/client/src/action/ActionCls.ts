import { type Component, variant } from "@use-pico/cls";

export const ActionCls = variant({
	slots: [
		"base",
		"action",
	],
	variants: {
		disabled: [
			"bool",
		],
		loading: [
			"bool",
		],
		active: [
			"bool",
		],
		variant: [
			"primary",
			"secondary",
			"danger",
			"danger-light",
			"subtle",
			"light",
			"neutral",
		],
		borderless: [
			"bool",
		],
	},
	rules: ({ root, rule }) => [
		root({
			base: {
				class: [
					"w-fit",
					"h-fit",
				],
			},
			action: {
				class: [
					"border",
					"cursor-pointer",
					"flex",
					"gap-2",
					"group",
					"h-fit",
					"hover:shadow-md",
					"items-center",
					"justify-center",
					"p-1",
					"rounded-sm",
					"rounded",
					"transition-all",
					"w-fit",
					"bg-(--pico-color-bg-default)",
					"hover:bg-(--pico-color-bg-hover)",
					"border-(--pico-color-border-default)",
					"hover:border-(--pico-color-border-hover)",
					"shadow-(--pico-color-shadow-default)",
					"hover:shadow-(--pico-color-shadow-hover)",
					"text-(--pico-color-text-default)",
					"hover:text-(--pico-color-text-hover)",
				],
			},
		}),
		rule(
			{
				disabled: true,
			},
			{
				base: {
					class: [
						"opacity-50",
						"cursor-not-allowed",
					],
				},
				action: {
					class: [
						"pointer-events-none",
					],
				},
			},
		),
		rule(
			{
				loading: true,
			},
			{
				action: {
					class: [
						"pointer-events-none",
					],
				},
			},
		),
		rule(
			{
				active: true,
			},
			{
				action: {
					class: [
						"active",
						"shadow-md",
					],
				},
			},
		),
		rule(
			{
				variant: "primary",
			},
			{
				action: {
					class: [
						"pico--action-color-danger",
					],
				},
			},
		),
		rule(
			{
				variant: "secondary",
			},
			{
				action: {
					class: [
						"pico--action-color-secondary",
					],
				},
			},
		),
		rule(
			{
				variant: "danger",
			},
			{
				action: {
					class: [
						"pico--action-color-danger",
					],
				},
			},
		),
		rule(
			{
				variant: "danger-light",
			},
			{
				action: {
					class: [
						"pico--action-color-danger-light",
					],
				},
			},
		),
		rule(
			{
				variant: "subtle",
			},
			{
				action: {
					class: [
						"pico--action-color-subtle",
					],
				},
			},
		),
		rule(
			{
				variant: "light",
			},
			{
				action: {
					class: [
						"pico--action-color-light",
					],
				},
			},
		),
		rule(
			{
				variant: "neutral",
			},
			{
				action: {
					class: [
						"pico--action-color-neutral",
					],
				},
			},
		),
		rule(
			{
				borderless: true,
			},
			{
				action: {
					class: [
						"border-none",
					],
				},
			},
		),
	],
	defaults: {
		disabled: false,
		loading: false,
		active: false,
		variant: "subtle",
		borderless: false,
	},
});

export namespace ActionCls {
	export type Props<P = unknown> = Component<typeof ActionCls, P>;
}
