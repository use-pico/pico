import { css } from "@use-pico/common";

export const MenuLinkCss = css({
	slot: {
		base: [
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
			"hover:text-slate-500",
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
			then: {
				base: [
					"border",
					"border-b-2",
					"border-blue-400",
					"bg-blue-50",
					"hover:border-blue-500",
					"text-slate-800",
					"hover:text-blue-800",
				],
			},
		},
		{
			if: {
				active: true,
				inner: true,
			},
			then: {
				base: ["border-none", "text-blue-600", "hover:text-blue-800"],
			},
		},
		{
			if: {
				subtle: true,
			},
			then: {
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
			then: {
				base: ["bg-slate-100", "border-slate-400"],
			},
		},
		{
			if: {
				vertical: true,
			},
			then: {
				base: ["w-full"],
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

export namespace MenuLinkCss {
	export type Props<P = unknown> = css.Props<typeof MenuLinkCss, P>;
}
