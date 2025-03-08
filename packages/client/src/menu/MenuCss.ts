import { css } from "@use-pico/common";

export const MenuCss = css({
	slot: {
		base: ["flex", "flex-row", "gap-2", "items-center"],
	},
	variant: {
		vertical: {
			true: [],
		},
	},
	match: [
		{
			if: {
				vertical: true,
			},
			then: {
				base: ["flex-col", "items-start"],
			},
		},
	],
	defaults: {
		vertical: false,
	},
});

export namespace MenuCss {
	export type Props<P = unknown> = css.Props<typeof MenuCss, P>;
}
