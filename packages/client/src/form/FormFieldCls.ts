import { type Component, variant } from "@use-pico/cls";

export const FormFieldCls = variant({
	slots: [
		"base",
		"input",
	],
	variants: {
		required: [
			"bool",
		],
		disabled: [
			"bool",
		],
		isSubmitting: [
			"bool",
		],
		isLoading: [
			"bool",
		],
		isError: [
			"bool",
		],
	},
	rule: [
		{
			slot: {
				base: {
					class: [
						"flex",
						"flex-col",
						"gap-1",
						"w-full",
					],
				},
				input: {
					class: [],
				},
			},
		},
		{
			match: {
				isError: true,
			},
			slot: {
				base: {
					class: [
						"text-(--input-error-color-text)",
					],
				},
			},
		},
		{
			match: {
				required: true,
			},
			slot: {
				base: {
					class: [
						"text-(--input-required-color-text)",
						"font-bold",
					],
				},
			},
		},
		{
			match: {
				disabled: true,
			},
			slot: {
				base: {
					class: [
						"opacity-75",
						"cursor-not-allowed",
					],
				},
				input: {
					class: [
						"pointer-events-none",
					],
				},
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
	export type Props<P = unknown> = Component<FormFieldCls, P>;
}
