import { css } from "@use-pico/common";
import { ActionCss } from "./ActionCss";

export const ActionLinkCss = css({
	use: ActionCss,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionLinkCss {
	export type Props<P = unknown> = css.Props<typeof ActionLinkCss, P>;
}
