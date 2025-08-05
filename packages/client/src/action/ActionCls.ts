import { type ClsProps, cls } from "@use-pico/cls";

export const ActionCls = cls({
	slot: {
		base: [
			"w-fit",
			"h-fit",
		],
		action: [
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
	variant: {
		disabled: {
			true: [
				"cursor-not-allowed",
			],
		},
		loading: {
			true: [
				"cursor-not-allowed",
			],
		},
		active: {
			true: [
				"active",
				"shadow-md",
			],
		},
		variant: {
			primary: [
				"pico--action-color-danger",
			],
			secondary: [
				"pico--action-color-secondary",
			],
			danger: [
				"pico--action-color-danger",
			],
			"danger-light": [
				"pico--action-color-danger-light",
			],
			subtle: [
				"pico--action-color-subtle",
			],
			light: [
				"pico--action-color-light",
			],
			neutral: [
				"pico--action-color-neutral",
			],
		},
		borderless: {
			true: [
				"border-none",
			],
		},
	},
	match: [
		{
			if: {
				disabled: true,
			},
			do: {
				base: [
					"opacity-50",
					"cursor-not-allowed",
				],
				action: [
					"pointer-events-none",
				],
			},
		},
		{
			if: {
				loading: true,
			},
			do: {
				action: [
					"pointer-events-none",
				],
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
	export type Props<P = unknown> = ClsProps<typeof ActionCls, P>;
}
