import { css } from "@use-pico/common";

export const TabListCss = css({
	slot: {
		base: ["flex", "flex-row", "items-center", "justify-between"],
		tabs: ["flex", "flex-row", "items-center", "gap-1", "mb-4"],
	},
	variant: {},
	defaults: {},
});

export namespace TabListCss {
	export type Props<P = unknown> = css.Props<typeof TabListCss, P>;
}
