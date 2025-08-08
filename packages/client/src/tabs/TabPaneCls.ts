import { type Component, variant } from "@use-pico/cls";

export const TabPaneCls = variant({
	slots: [
		"base",
	],
	variants: {
		hidden: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([]),
		}),
		rule(
			{
				hidden: true,
			},
			{
				base: classes([
					"hidden",
				]),
			},
		),
	],
	defaults: {
		hidden: false,
	},
});

export namespace TabPaneCls {
	export type Props<P = unknown> = Component<typeof TabPaneCls, P>;
}
