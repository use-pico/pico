import { type ClsProps, cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = ClsProps<typeof TabPaneCls, P>;
}
