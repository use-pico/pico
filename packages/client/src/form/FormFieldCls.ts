import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const FormFieldCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-1",
			"w-full",
		],
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
			do: {
				base: [
					"text-(--input-error-color-text)",
				],
			},
		},
		{
			if: {
				required: true,
			},
			do: {
				base: [
					"text-(--input-required-color-text)",
					"font-bold",
				],
			},
		},
		{
			if: {
				disabled: true,
			},
			do: {
				base: [
					"opacity-75",
					"cursor-not-allowed",
				],
				input: [
					"pointer-events-none",
				],
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
export type FormFieldCls = typeof FormFieldCls;

export namespace FormFieldCls {
	export type Props<P = unknown> = ClsProps<FormFieldCls, P>;

	export type Slots = ClsSlots<FormFieldCls>;
}
