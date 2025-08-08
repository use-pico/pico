import { type Component, classes, variant } from "@use-pico/cls";

export const TabPaneCls = variant({
	slots: [
		"base",
	],
	variants: {
		hidden: [
			"bool",
		],
	},
	rule: [
		{
			slot: {
				base: classes([]),
			},
		},
		{
			match: {
				hidden: true,
			},
			slot: {
				base: classes([
					"hidden",
				]),
			},
		},
	],
	defaults: {
		hidden: false,
	},
});

export namespace TabPaneCls {
	export type Props<P = unknown> = Component<typeof TabPaneCls, P>;
}
