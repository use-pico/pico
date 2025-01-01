import { css } from "@use-pico/common";
import { PopupSelectCss } from "../popup-select/PopupSelectCss";

export const PopupMultiSelectCss = css({
	use: PopupSelectCss,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace PopupMultiSelectCss {
	export type Props<P = unknown> = css.Props<typeof PopupMultiSelectCss, P>;
}
