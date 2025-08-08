import { type Component, variant } from "@use-pico/cls";

export const ModalCls = variant({
	slots: [
		"base",
		"target",
		"modal",
	],
	variants: {
		disabled: [
			"bool",
		],
		loading: [
			"bool",
		],
	},
	rules: ({ root, rule }) => [
		root({
			base: {
				class: [
					"bg-slate-400/75",
					"backdrop-blur-xs",
					"flex",
					"justify-center",
					"py-12",
				],
			},
			target: {
				class: [],
			},
			modal: {
				class: [
					"bg-white",
					"rounded-lg",
					"shadow-lg",
					"p-4",
					"max-h-full",
					"h-fit",
					"flex",
					"flex-col",
					"gap-2",
					"w-2/3",
				],
			},
		}),
		rule(
			{
				disabled: true,
			},
			{
				base: {
					class: [
						"pointer-events-none",
						"cursor-not-allowed",
					],
				},
			},
		),
		rule(
			{
				loading: true,
			},
			{
				base: {
					class: [
						"pointer-events-none",
						"opacity-50",
					],
				},
			},
		),
	],
	defaults: {
		disabled: false,
		loading: false,
	},
});

export namespace ModalCls {
	export type Props<P = unknown> = Component<typeof ModalCls, P>;
}
