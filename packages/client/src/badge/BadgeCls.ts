import { cls } from "@use-pico/cls";

export const BadgeCls = cls({
	slot: {
		base: [
			"border",
			"flex-row",
			"flex",
			"font-bold",
			"gap-2",
			"items-center",
			"px-4",
			"py-1",
			"rounded-2xl",
			"text-sm",
		],
	},
	variant: {
		active: {
			true: [],
		},
		variant: {
			primary: [
				"bg-(--pico-color-primary-bg-default)",
				"border-(--pico-color-primary-border-default)",
				"text-(--pico-color-primary-text-default)",
			],
			secondary: [
				"bg-(--pico-color-secondary-bg-default)",
				"border-(--pico-color-secondary-border-default)",
				"text-(--pico-color-secondary-text-default)",
			],
			danger: [
				"bg-(--pico-color-danger-bg-default)",
				"border-(--pico-color-danger-border-default)",
				"text-(--pico-color-danger-text-default)",
			],
			"danger-light": [
				"bg-(--pico-color-danger-light-bg-default)",
				"border-(--pico-color-danger-light-border-default)",
				"text-(--pico-color-danger-light-text-default)",
			],
			light: [
				"bg-(--pico-color-light-bg-default)",
				"border-(--pico-color-light-border-default)",
				"text-(--pico-color-light-text-default)",
			],
			subtle: [
				"bg-(--pico-color-subtle-bg-default)",
				"border-(--pico-color-subtle-border-default)",
				"text-(--pico-color-subtle-text-default)",
			],
			neutral: [
				"bg-(--pico-color-neutral-bg-default)",
				"border-(--pico-color-neutral-border-default)",
				"text-(--pico-color-neutral-text-default)",
			],
		},
		borderless: {
			true: [
				"border-none",
			],
		},
		size: {
			xs: [
				"text-xs",
				"px-2",
				"py-0.5",
			],
			sm: [
				"text-sm",
				"px-2",
				"py-1",
			],
			md: [
				"text-md",
				"px-3",
				"py-1.5",
			],
			lg: [
				"text-lg",
				"px-4",
				"py-2",
			],
		},
	},
	match: [
		{
			if: {
				active: true,
			},
			do: {
				base: [
					"shadow-md",
				],
			},
		},
	],
	defaults: {
		active: false,
		variant: "light",
		borderless: false,
		size: "md",
	},
});

export namespace BadgeCls {
	export type Props<P = unknown> = cls.Props<typeof BadgeCls, P>;
}
