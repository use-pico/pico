import { type Component, variant } from "@use-pico/cls";

export const FloatCls = variant({
	slots: [
		"target",
		"portal",
	],
	variants: {
		mounted: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			target: classes([
				"flex",
				"justify-center",
				"items-center",
			]),
			portal: classes([]),
		}),
		rule(
			{
				mounted: false,
			},
			{
				portal: classes([
					"hidden",
				]),
			},
		),
	],
	defaults: {
		mounted: false,
	},
});

export namespace FloatCls {
	export type Props<P = unknown> = Component<typeof FloatCls, P>;
}
