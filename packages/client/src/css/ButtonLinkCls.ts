import { type Component, variant } from "@use-pico/cls";

export const ButtonLinkCls = variant({
	slots: [
		"base",
	],
	variants: {
		disabled: [
			"bool",
		],
	},
	rules: ({ root, rule }) => [
		root({
			base: {
				class: [
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"px-4",
					"py-2",
					"rounded-md",
					"text-md",
					"text-blue-400",
					"hover:text-blue-600",
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
						"cursor-not-allowed",
						"text-slate-400",
						"hover:text-slate-400",
					],
				},
			},
		),
	],
	defaults: {
		disabled: false,
	},
});
export type ButtonLinkCls = typeof ButtonLinkCls;

export namespace ButtonLinkCls {
	export type Props<P = unknown> = Component<typeof ButtonLinkCls, P>;
}
