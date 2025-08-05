import { cls } from "@use-pico/cls";

export const FloatCls = cls({
	slot: {
		target: [
			"flex",
			"justify-center",
			"items-center",
		],
		portal: [],
	},
	variant: {
		mounted: {
			true: [],
		},
	},
	match: [
		{
			if: {
				mounted: false,
			},
			do: {
				portal: [
					"hidden",
				],
			},
		},
	],
	defaults: {
		mounted: false,
	},
});

export namespace FloatCls {
	export type Props<P = unknown> = cls.Props<typeof FloatCls, P>;
}
