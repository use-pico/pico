import { cls } from "@use-pico/common";

export const AlertCls = cls({
	slot: {
		base: [
			"pico--alert",
			"border",
			"rounded",
			"py-2",
			"px-3",
			"flex",
			"flex-col",
			// CSS Variables
			"border-(--pico-color-border-default)",
			"bg-(--pico-color-bg-default)",
			"text-(--pico-color-text-default)",
		],
		title: [
			"font-semibold",
			"w-full",
		],
		message: [
			"opacity-85",
			"text-sm",
			"w-full",
		],
		body: [
			"border-t",
			"w-full",
			// CSS Variables
			"border-(--pico-color-border-default)",
		],
	},
	variant: {
		variant: {
			info: [
				"pico--alert-color-info",
			],
			success: [
				"pico--alert-color-success",
			],
			warning: [
				"pico--alert-color-warning",
			],
			error: [
				"pico--alert-color-error",
			],
			neutral: [
				"pico--alert-color-neutral",
			],
			subtle: [
				"pico--alert-color-subtle",
			],
		},
		clickable: {
			true: [
				"cursor-pointer",
			],
		},
	},
	match: [
		{
			if: {
				variant: "info",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-info-clickable-hover-bg)",
			},
		},
		{
			if: {
				variant: "success",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-success-clickable-hover-bg)",
			},
		},
		{
			if: {
				variant: "warning",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-warning-clickable-hover-bg)",
			},
		},
		{
			if: {
				variant: "error",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-error-clickable-hover-bg)",
			},
		},
		{
			if: {
				variant: "neutral",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-neutral-clickable-hover-bg)",
			},
		},
		{
			if: {
				variant: "subtle",
				clickable: true,
			},
			do: {
				base: "hover:bg-(--color-subtle-clickable-hover-bg)",
			},
		},
	],
	defaults: {
		clickable: false,
		variant: "info",
	},
});

export namespace AlertCls {
	export type Props<P = unknown> = cls.Props<typeof AlertCls, P>;
}
