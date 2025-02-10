import { css } from "@use-pico/common";

export const FormCss = css({
	slot: {
		base: [
			"border",
			"border-gray-300",
			"rounded-md",
			"p-4",
			"flex",
			"flex-col",
			"gap-2",
			"items-center",
		],
		fieldset: ["flex", "flex-col", "gap-4", "w-full", "p-4"],
		legend: [
			"font-bold",
			"text-lg",
			"p-1",
			"border-b",
			"border-slate-400",
			"w-full",
		],
		input: [
			"w-full",
			"border",
			"border-gray-300",
			"rounded-md",
			"p-2",
			"focus:outline-hidden",
			"focus:ring-2",
			"focus:ring-blue-500",
			"focus:border-transparent",
		],
	},
	variant: {
		isLoading: {
			true: [],
		},
		isSubmitting: {
			true: [],
		},
	},
	match: [
		{
			if: {
				isSubmitting: true,
			},
			then: {
				base: ["opacity-50", "pointer-events-none", "select-none"],
			},
		},
	],
	defaults: {
		isLoading: false,
		isSubmitting: false,
	},
});

export namespace FormCss {
	export type Props<P = unknown> = css.Props<typeof FormCss, P>;
}
