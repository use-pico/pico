import { type Component, variant } from "@use-pico/cls";

export const MenuCls = variant({
	slots: [
		"base",
	],
	variants: {
		vertical: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
			]),
		}),
		rule(
			{
				vertical: true,
			},
			{
				base: classes([
					"flex-col",
					"items-start",
				]),
			},
		),
	],
	defaults: {
		vertical: false,
	},
});

export namespace MenuCls {
	export type Props<P = unknown> = Component<typeof MenuCls, P>;
}
