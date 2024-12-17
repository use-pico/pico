import { css } from "@use-pico/common";

export const PageCss = css({
	slot: {
		base: ["flex", "flex-col", "gap-2"],
	},
	variant: {},
	defaults: {},
});

export namespace PageCss {
	export type Props<P = unknown> = css.Props<typeof PageCss, P>;
}
