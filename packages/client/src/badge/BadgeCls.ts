import { cls } from "@use-pico/common";

export const BadgeCls = cls({
	slot: {
		base: [
			"pico--badge",
			"bg-(--color-bg)",
			"border-(--color-border)",
			"border",
			"flex-row",
			"flex",
			"font-bold",
			"gap-2",
			"items-center",
			"px-4",
			"py-1",
			"rounded-2xl",
			"text-(--color-text)",
			"text-sm",
		],
	},
	variant: {
		active: {
			true: [],
		},
		variant: {
			primary: [
				"color-primary",
			],
			secondary: [
				"color-secondary",
			],
			danger: [
				"color-danger",
			],
			light: [
				"color-light",
			],
			subtle: [
				"color-subtle",
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
