import { cls } from "@use-pico/common";

export const ActionCls = cls({
	slot: {
		base: [
			"pico--action",
			"w-fit",
			"h-fit",
		],
		action: [
			"bg-(--color-bg)",
			"border-(--color-border)",
			"border",
			"cursor-pointer",
			"flex",
			"gap-2",
			"group",
			"h-fit",
			"hover:bg-(--color-bg-hover)",
			"hover:border-(--color-border-hover)",
			"hover:shadow-(--color-shadow-hover)",
			"hover:shadow-md",
			"hover:text-(--color-text-hover)",
			"items-center",
			"justify-center",
			"p-1",
			"rounded-sm",
			"rounded",
			"shadow-(--color-shadow)",
			"text-(--color-text)",
			"text-2xl",
			"transition-all",
			"w-fit",
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
				"color-primary",
			],
			secondary: [
				"color-secondary",
			],
			danger: [
				"color-danger",
			],
			subtle: [
				"color-subtle",
			],
			light: [
				"color-light",
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
	export type Props<P = unknown> = cls.Props<typeof ActionCls, P>;
}
