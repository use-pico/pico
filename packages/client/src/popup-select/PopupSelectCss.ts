import { css } from "@use-pico/common";

export const PopupSelectCss = css({
	slot: {
		base: [],
	},
	variant: {},
	defaults: {},
});

export namespace PopupSelectCss {
	export type Props<P = unknown> = css.Props<typeof PopupSelectCss, P>;
}
