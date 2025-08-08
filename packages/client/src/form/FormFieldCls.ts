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
	rules: ({ root, rule }) => [
		root({
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
		}),
		rule(
			{
				isError: true,
			},
			{
				base: {
					class: [
						"text-(--input-error-color-text)",
					],
				},
			},
		),
		rule(
			{
				required: true,
			},
			{
				base: {
					class: [
						"text-(--input-required-color-text)",
						"font-bold",
					],
				},
			},
		),
		rule(
			{
				disabled: true,
			},
			{
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
		),
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
