import { css } from "@use-pico/common";

export const TxCss = css({
	slot: {
		base: [],
	},
	variant: {},
	defaults: {},
});

export namespace TxCss {
	export type Props<P = unknown> = css.Props<typeof TxCss, P>;
}
