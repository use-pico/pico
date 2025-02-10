import { css } from "@use-pico/common";

export const FormInputCss = css({
	slot: {
		base: ["flex", "flex-col", "gap-1", "w-full"],
		input: [],
	},
	variant: {
		required: {
			true: [],
		},
		disabled: {
			true: [],
		},
		isSubmitting: {
			true: [],
		},
		isLoading: {
			true: [],
		},
		isError: {
			true: [],
		},
	},
	match: [
		{
			if: {
				isError: true,
			},
			then: {
				base: ["text-red-600"],
			},
		},
		{
			if: {
				required: true,
			},
			then: {
				base: ["text-emerald-600", "font-bold"],
			},
		},
		{
			if: {
				disabled: true,
			},
			then: {
				base: ["opacity-75", "cursor-not-allowed"],
				input: ["pointer-events-none"],
			},
		},
	],
	defaults: {
		required: false,
		disabled: false,
		isSubmitting: false,
		isLoading: false,
		isError: false,
	},
});

export namespace FormInputCss {
	export type Props<P = unknown> = css.Props<typeof FormInputCss, P>;
}
