import { css } from "@use-pico/common";

export const CursorCss = css({
	slot: {
		base: ["flex", "items-center", "justify-between", "gap-2"],
		sums: ["flex", "items-center", "gap-2", "text-sm"],
	},
	variant: {},
	defaults: {},
});

export namespace CursorCss {
	export type Props<P = unknown> = css.Props<typeof CursorCss, P>;
}
