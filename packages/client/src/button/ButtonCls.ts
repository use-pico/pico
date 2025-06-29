import { cls } from "@use-pico/common";

export const ButtonCls = cls({
	slot: {
		base: [
			"pico--button",
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
			"text-(--color-text)",
			"bg-(--color-bg)",
			"border-(--color-border)",
			"hover:border-(--color-border-hover)",
			"hover:text-(--color-text-hover)",
			"hover:bg-(--color-bg-hover)",
		],
	},
	variant: {
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
			"danger-light": [
				"color-danger-light",
			],
			subtle: [
				"color-subtle",
			],
			light: [
				"color-light",
			],
			neutral: [
				"color-neutral",
			],
		},
		disabled: {
			true: [
				"cursor-not-allowed",
				"opacity-50",
				"hover:border-(--color-border)",
				"hover:text-(--color-text)",
				"hover:bg-(--color-bg)",
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
