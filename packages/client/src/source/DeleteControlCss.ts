import { css } from "@use-pico/common";

export const DeleteControlCss = css({
	slot: {
		base: ["flex", "flex-col", "gap-4"],
		content: ["text-bold", "text-red-500", "font-bold"],
		footer: ["flex", "flex-row", "items-center", "justify-between", "gap-4"],
	},
	variant: {},
	defaults: {},
});

export namespace DeleteControlCss {
	export type Props<P = unknown> = css.Props<typeof DeleteControlCss, P>;
}
