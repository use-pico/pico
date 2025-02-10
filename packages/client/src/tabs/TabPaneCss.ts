import { css } from "@use-pico/common";

export const TabPaneCss = css({
	slot: {
		base: [],
	},
	variant: {
		hidden: {
			true: ["hidden"],
		},
	},
	defaults: {
		hidden: false,
	},
});

export namespace TabPaneCss {
	export type Props<P = unknown> = css.Props<typeof TabPaneCss, P>;
}
