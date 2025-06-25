import { cls } from "@use-pico/common";

export const TabPaneCls = cls({
	slot: {
		base: [],
	},
	variant: {
		hidden: {
			true: [
				"hidden",
			],
		},
	},
	defaults: {
		hidden: false,
	},
});

export namespace TabPaneCls {
	export type Props<P = unknown> = cls.Props<typeof TabPaneCls, P>;
}
