import { type Component, variant } from "@use-pico/cls";

export const CardCls = variant({
	slots: [
		"base",
	],
	variants: {
		inline: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"flex",
				"flex-col",
				"gap-4",
				"border",
				"border-slate-100",
				"p-4",
				"rounded-lg",
			]),
		}),
		rule(
			{
				inline: true,
			},
			{
				base: classes([
					"flex-row",
					"border-none",
					"gap-1",
					"p-0",
					"flex-1",
				]),
			},
		),
	],
	defaults: {
		inline: false,
	},
});
export type CardCls = typeof CardCls;

export namespace CardCls {
	export type Props<P = unknown> = Component<CardCls, P>;
}
