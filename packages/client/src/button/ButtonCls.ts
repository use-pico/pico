import { cls } from "@use-pico/common";

export const ButtonCls = cls({
	slot: {
		base: [
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
			// CSS Variables
			"bg-(--pico-color-bg-default)",
			"hover:bg-(--pico-color-bg-hover)",
			//
			"border-(--pico-color-border-default)",
			"hover:border-(--pico-color-border-hover)",
			//
			"text-(--pico-color-text-default)",
			"hover:text-(--pico-color-text-hover)",
			//
			"shadow-(--pico-color-shadow-default)",
			"hover:shadow-(--pico-color-shadow-hover)",
		],
	},
	variant: {
		variant: {
			primary: [
				"pico--button-color-primary",
			],
			secondary: [
				"pico--button-color-secondary",
			],
			danger: [
				"pico--button-color-danger",
			],
			"danger-light": [
				"pico--button-color-danger-light",
			],
			subtle: [
				"pico--button-color-subtle",
			],
			light: [
				"pico--button-color-light",
			],
			neutral: [
				"pico--button-color-neutral",
			],
		},
		disabled: {
			true: [
				"cursor-not-allowed",
				"opacity-50",
				"hover:border-(--pico-color-border-default)",
				"hover:text-(--pico-color-text-default)",
				"hover:bg-(--pico-color-bg-default)",
			],
		},
		size: {
			xs: [
				"py-0.5",
				"px-1",
			],
			sm: [
				"py-1",
				"px-2",
			],
			md: [
				"py-2",
				"px-4",
			],
			lg: [
				"py-3",
				"px-6",
			],
			xl: [
				"py-4",
				"px-8",
			],
		},
		borderless: {
			true: [
				"border-none",
			],
		},
	},
	defaults: {
		variant: "primary",
		disabled: false,
		size: "md",
		borderless: false,
	},
});

export namespace ButtonCls {
	export type Props<P = unknown> = cls.Props<typeof ButtonCls, P>;
}
