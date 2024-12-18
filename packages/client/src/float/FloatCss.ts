import { css } from "@use-pico/common";

export const FloatCss = css({
	slot: {
		target: ["flex", "justify-center", "items-center"],
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
			then: {
				portal: ["hidden"],
			},
		},
	],
	defaults: {
		mounted: false,
	},
});

export namespace FloatCss {
	export type Props<P = unknown> = css.Props<typeof FloatCss, P>;
}
