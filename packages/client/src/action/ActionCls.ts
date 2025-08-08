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
	rules: [
		{
			slot: {
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
						// CSS Variables
						"bg-(--pico-color-bg-default)",
						"hover:bg-(--pico-color-bg-hover)",
						//
						"border-(--pico-color-border-default)",
						"hover:border-(--pico-color-border-hover)",
						//
						"shadow-(--pico-color-shadow-default)",
						"hover:shadow-(--pico-color-shadow-hover)",
						//
						"text-(--pico-color-text-default)",
						"hover:text-(--pico-color-text-hover)",
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
		},
		{
			match: {
				loading: true,
			},
			slot: {
				action: {
					class: [
						"pointer-events-none",
					],
				},
			},
		},
		{
			match: {
				active: true,
			},
			slot: {
				action: {
					class: [
						"active",
						"shadow-md",
					],
				},
			},
		},
		{
			match: {
				variant: "primary",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-danger",
					],
				},
			},
		},
		{
			match: {
				variant: "secondary",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-secondary",
					],
				},
			},
		},
		{
			match: {
				variant: "danger",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-danger",
					],
				},
			},
		},
		{
			match: {
				variant: "danger-light",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-danger-light",
					],
				},
			},
		},
		{
			match: {
				variant: "subtle",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-subtle",
					],
				},
			},
		},
		{
			match: {
				variant: "light",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-light",
					],
				},
			},
		},
		{
			match: {
				variant: "neutral",
			},
			slot: {
				action: {
					class: [
						"pico--action-color-neutral",
					],
				},
			},
		},
		{
			match: {
				borderless: true,
			},
			slot: {
				action: {
					class: [
						"border-none",
					],
				},
			},
		},
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
