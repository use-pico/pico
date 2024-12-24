import { css } from "@use-pico/common";
import { ActionCss } from "./ActionCss";

export const ActionModalCss = css({
	use: ActionCss,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionModalCss {
	export type Props<P = unknown> = css.Props<typeof ActionModalCss, P>;
}
