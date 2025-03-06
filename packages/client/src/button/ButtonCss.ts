import { css } from "@use-pico/common";

export const ButtonCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"justify-center",
			"gap-2",
			"group",
			"rounded-sm",
			"transition-all",
			"cursor-pointer",
		],
	},
	variant: {
		variant: {
			primary: ["text-white", "bg-blue-400", "hover:bg-blue-500"],
			secondary: ["text-slate-700", "bg-amber-400", "hover:bg-amber-500"],
			subtle: [
				"text-slate-600",
				"border",
				"bg-slate-50",
				"border-slate-300",
				"hover:border-slate-400",
				"hover:text-slate-800",
				"hover:bg-slate-100",
			],
			light: [
				"text-blue-400",
				"hover:text-blue-600",
				"border",
				"border-blue-400",
				"hover:border-blue-600",
				"hover:bg-blue-50",
			],
			danger: ["text-slate-50"],
		},
		disabled: {
			true: ["cursor-not-allowed"],
		},
		size: {
			xs: [],
			sm: [],
			md: [],
			lg: [],
			xl: [],
		},
		borderless: {
			true: ["border-none"],
		},
	},
	match: [
		/**
		 * Button slot variants
		 */
		{
			if: {
				variant: "primary",
				disabled: true,
			},
			then: {
				base: ["opacity-50", "bg-blue-600", "hover:bg-blue-600"],
			},
		},
		{
			if: {
				variant: "secondary",
				disabled: true,
			},
			then: {
				base: ["opacity-50", "bg-amber-600", "hover:bg-amber-600"],
			},
		},
		{
			if: {
				variant: "subtle",
				disabled: true,
			},
			then: {
				base: ["opacity-50", "bg-blue-50", "hover:bg-blue-50"],
			},
		},
		{
			if: {
				variant: "danger",
			},
			then: {
				base: ["bg-red-400", "hover:bg-red-500", "hover:text-white"],
			},
		},
		{
			if: {
				variant: "light",
				disabled: true,
			},
			then: {
				base: [
					"opacity-50",
					"bg-blue-50",
					"hover:text-blue-400",
					"hover:border-blue-400",
				],
			},
		},
		{
			if: {
				size: "xs",
			},
			then: {
				base: ["py-0.5", "px-1"],
			},
		},
		{
			if: {
				size: "sm",
			},
			then: {
				base: ["py-1", "px-2"],
			},
		},
		{
			if: {
				size: "md",
			},
			then: {
				base: ["py-2", "px-4"],
			},
		},
		{
			if: {
				size: "lg",
			},
			then: {
				base: ["py-3", "px-6"],
			},
		},
		{
			if: {
				size: "xl",
			},
			then: {
				base: ["py-4", "px-8"],
			},
		},
	],
	defaults: {
		variant: "primary",
		disabled: false,
		size: "md",
		borderless: false,
	},
});

export namespace ButtonCss {
	export type Props<P = unknown> = css.Props<typeof ButtonCss, P>;
}
