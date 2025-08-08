import { type Component, variant } from "@use-pico/cls";

export const FormCls = variant({
	slots: [
		"base",
		"fieldset",
		"legend",
		"input",
	],
	variants: {
		isSubmitting: [
			"bool",
		],
	},
	rules: ({ root, rule }) => [
		root({
			base: {
				class: [
					"border",
					"border-gray-300",
					"rounded-md",
					"p-4",
					"flex",
					"flex-col",
					"gap-2",
					"items-center",
				],
			},
			fieldset: {
				class: [
					"flex",
					"flex-col",
					"gap-4",
					"w-full",
					"p-4",
				],
			},
			legend: {
				class: [
					"font-bold",
					"text-lg",
					"p-1",
					"border-b",
					"border-slate-400",
					"w-full",
				],
			},
			input: {
				class: [
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
		}),
		rule(
			{
				isSubmitting: true,
			},
			{
				base: {
					class: [
						"opacity-50",
						"pointer-events-none",
						"select-none",
					],
				},
			},
		),
	],
	defaults: {
		isSubmitting: false,
	},
});
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = Component<typeof FormCls, P>;
}
