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
	rule: [
		{
			slot: {
				target: {
					class: [
						"flex",
						"justify-center",
						"items-center",
					],
				},
				portal: {
					class: [],
				},
			},
		},
		{
			match: {
				mounted: false,
			},
			slot: {
				portal: {
					class: [
						"hidden",
					],
				},
			},
		},
	],
	defaults: {
		mounted: false,
	},
});

export namespace FloatCls {
	export type Props<P = unknown> = Component<typeof FloatCls, P>;
}
