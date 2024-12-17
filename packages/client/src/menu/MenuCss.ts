import { css } from "@use-pico/common";

export const MenuCss = css({
	slot: {
		base: ["flex", "flex-row", "gap-2", "items-center"],
	},
	variant: {},
	defaults: {},
});

export namespace MenuCss {
	export type Props<P = unknown> = css.Props<typeof MenuCss, P>;
}
