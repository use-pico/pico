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
			"border-(--color-body-border)",
			"w-full",
		],
	},
	variant: {
		variant: {
			info: [
				"border-(--color-info-border)",
				"bg-(--color-info-bg)",
				"text-(--color-info-text)",
			],
			success: [
				"border-(--color-success-border)",
				"bg-(--color-success-bg)",
				"text-(--color-success-text)",
			],
			warning: [
				"border-(--color-warning-border)",
				"bg-(--color-warning-bg)",
				"text-(--color-warning-text)",
			],
			error: [
				"border-(--color-error-border)",
				"bg-(--color-error-bg)",
				"text-(--color-error-text)",
			],
			neutral: [
				"border-(--color-neutral-border)",
				"bg-(--color-neutral-bg)",
				"text-(--color-neutral-text)",
			],
			subtle: [
				"border-(--color-subtle-border)",
				"bg-(--color-subtle-bg)",
				"text---color-subtle-text",
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
