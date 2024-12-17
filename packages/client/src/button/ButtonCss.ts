import { css } from "@use-pico/common";

export const ButtonCss = css({
	slot: {
		base: [
			"flex",
			"items-center",
			"justify-center",
			"gap-2",
			"group",
			"rounded",
			"transition-all",
		],
	},
	variant: {
		variant: {
			primary: ["text-white"],
			secondary: ["text-slate-700"],
			subtle: ["text-slate-600"],
			danger: ["text-slate-50"],
		},
		disabled: {
			true: "cursor-not-allowed",
		},
		size: {
			xs: [],
			sm: [],
			md: [],
		},
	},
	match: [
		/**
		 * Button slot variants
		 */
		{
			if: {
				variant: "primary",
			},
			then: {
				base: ["bg-blue-400", "hover:bg-blue-500"],
			},
		},
		{
			if: {
				variant: "primary",
				disabled: true,
			},
			then: {
				base: [
					"opacity-50",
					"bg-blue-600",
					"hover:bg-blue-600",
					"cursor-not-allowed",
				],
			},
		},
		{
			if: {
				variant: "secondary",
			},
			then: {
				base: ["bg-amber-400", "hover:bg-amber-500"],
			},
		},
		{
			if: {
				variant: "subtle",
			},
			then: {
				base: ["text-slate-600", "hover:text-slate-800", "hover:bg-blue-50"],
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
	],
	defaults: {
		variant: "primary",
		disabled: false,
		size: "md",
	},
});

export namespace ButtonCss {
	export type Props<P = unknown> = css.Props<typeof ButtonCss, P>;
}
