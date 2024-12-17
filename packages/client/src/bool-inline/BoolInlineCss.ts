import { css } from "@use-pico/common";
import { IconCss } from "../icon/IconCss";

export const BoolInlineCss = css({
	use: IconCss,
	slot: {},
	variant: {
		value: {
			true: "text-green-600",
			false: "text-amber-600",
		},
	},
	defaults: {
		value: false,
	},
});

export namespace BoolInlineCss {
	export type Props<P = unknown> = css.Props<typeof BoolInlineCss, P>;
}
