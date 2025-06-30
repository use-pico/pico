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
		],
	},
	variant: {
		variant: {
			primary: [
				"bg-(--pico-color-primary-bg-default)",
				"border-(--pico-color-primary-border-default)",
				"text-(--pico-color-primary-text-default)",
				"shadow-(--pico-color-primary-shadow-default)",
				"hover:shadow-(--pico-color-primary-shadow-hover)",
				"hover:bg-(--pico-color-primary-bg-hover)",
				"hover:border-(--pico-color-primary-border-hover)",
				"hover:text-(--pico-color-primary-text-hover)",
			],
			secondary: [
				"bg-(--pico-color-secondary-bg-default)",
				"border-(--pico-color-secondary-border-default)",
				"text-(--pico-color-secondary-text-default)",
				"shadow-(--pico-color-secondary-shadow-default)",
				"hover:shadow-(--pico-color-secondary-shadow-hover)",
				"hover:bg-(--pico-color-secondary-bg-hover)",
				"hover:border-(--pico-color-secondary-border-hover)",
				"hover:text-(--pico-color-secondary-text-hover)",
			],
			danger: [
				"bg-(--pico-color-danger-bg-default)",
				"border-(--pico-color-danger-border-default)",
				"text-(--pico-color-danger-text-default)",
				"shadow-(--pico-color-danger-shadow-default)",
				"hover:shadow-(--pico-color-danger-shadow-hover)",
				"hover:bg-(--pico-color-danger-bg-hover)",
				"hover:border-(--pico-color-danger-border-hover)",
				"hover:text-(--pico-color-danger-text-hover)",
			],
			"danger-light": [
				"bg-(--pico-color-danger-light-bg-default)",
				"border-(--pico-color-danger-light-border-default)",
				"text-(--pico-color-danger-light-text-default)",
				"shadow-(--pico-color-danger-light-shadow-default)",
				"hover:shadow-(--pico-color-danger-light-shadow-hover)",
				"hover:bg-(--pico-color-danger-light-bg-hover)",
				"hover:border-(--pico-color-danger-light-border-hover)",
				"hover:text-(--pico-color-danger-light-text-hover)",
			],
			subtle: [
				"bg-(--pico-color-subtle-bg-default)",
				"border-(--pico-color-subtle-border-default)",
				"text-(--pico-color-subtle-text-default)",
				"shadow-(--pico-color-subtle-shadow-default)",
				"hover:shadow-(--pico-color-subtle-shadow-hover)",
				"hover:bg-(--pico-color-subtle-bg-hover)",
				"hover:border-(--pico-color-subtle-border-hover)",
				"hover:text-(--pico-color-subtle-text-hover)",
			],
			light: [
				"bg-(--pico-color-light-bg-default)",
				"border-(--pico-color-light-border-default)",
				"text-(--pico-color-light-text-default)",
				"shadow-(--pico-color-light-shadow-default)",
				"hover:shadow-(--pico-color-light-shadow-hover)",
				"hover:bg-(--pico-color-light-bg-hover)",
				"hover:border-(--pico-color-light-border-hover)",
				"hover:text-(--pico-color-light-text-hover)",
			],
			neutral: [
				"bg-(--pico-color-neutral-bg-default)",
				"border-(--pico-color-neutral-border-default)",
				"text-(--pico-color-neutral-text-default)",
				"shadow-(--pico-color-neutral-shadow-default)",
				"hover:shadow-(--pico-color-neutral-shadow-hover)",
				"hover:bg-(--pico-color-neutral-bg-hover)",
				"hover:border-(--pico-color-neutral-border-hover)",
				"hover:text-(--pico-color-neutral-text-hover)",
			],
		},
		disabled: {
			true: [
				"cursor-not-allowed",
				"opacity-50",
				// TODO Resolve internal color variables (looks like I've to use .contracts for this)
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
