import { css } from "@use-pico/common";

export const LabelCountCss = css({
	slot: {
		base: ["flex", "flex-row", "items-center", "w-fit", "gap-2"],
		label: [],
	},
	variant: {},
	defaults: {},
});

export namespace LabelCountCss {
	export type Props<P = unknown> = css.Props<typeof LabelCountCss, P>;
}
