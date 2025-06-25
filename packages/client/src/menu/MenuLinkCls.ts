import { cls } from "@use-pico/common";

export const MenuLinkCls = cls({
	slot: {
		base: [
			"pico--menu-link",
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"rounded-sm",
			"px-2",
			"py-1",
			"border",
			"border-b-2",
			"border-transparent",
			"hover:text-(--color-text-hover)",
			"hover:bg-(--color-bg-hover)",
			"hover:border-(--color-border-hover)",
		],
	},
	variant: {
		active: {
			true: [],
		},
		inner: {
			true: [],
		},
		subtle: {
			true: [],
		},
		vertical: {
			true: [],
		},
	},
	match: [
		{
			if: {
				active: true,
				inner: false,
			},
			do: {
				base: [
					"bg-(--color-active-bg)",
					"border-(--color-active-border)",
					"hover:border-(--color-active-border-hover)",
					"hover:text-(--color-active-text-hover)",
					"text-(--color-active-text)",
				],
			},
		},
		{
			if: {
				active: true,
				inner: true,
			},
			do: {
				base: [
					"border-transparent",
					"bg-(--color-active-bg)",
					"hover:border-(--color-active-border-hover)",
					"hover:text-(--color-active-text-hover)",
					"text-(--color-active-text)",
				],
			},
		},
		{
			if: {
				subtle: true,
			},
			do: {
				base: [
					"hover:bg-slate-50",
					"hover:border-slate-300",
					"hover:text-slate-600",
				],
			},
		},
		{
			if: {
				active: true,
				subtle: true,
			},
			do: {
				base: [
					"bg-slate-100",
					"border-slate-400",
				],
			},
		},
		{
			if: {
				vertical: true,
			},
			do: {
				base: [
					"w-full",
				],
			},
		},
	],
	defaults: {
		active: false,
		inner: false,
		subtle: false,
		vertical: false,
	},
});

export namespace MenuLinkCls {
	export type Props<P = unknown> = cls.Props<typeof MenuLinkCls, P>;
}
