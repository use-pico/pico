import { css } from "@use-pico/common";
import { ActionCss } from "./ActionCss";

export const ActionClickCss = css({
	use: ActionCss,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionClickCss {
	export type Props<P = unknown> = css.Props<typeof ActionClickCss, P>;
}
