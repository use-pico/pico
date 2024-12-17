import { css } from "@use-pico/common";

export const CardCss = css({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-4",
			"border",
			"border-slate-100",
			"p-4",
			"rounded-lg",
		],
	},
	variant: {
		inline: {
			true: ["flex-row", "border-none", "gap-1", "p-0", "flex-1"],
		},
	},
	defaults: {
		inline: false,
	},
});

export namespace CardCss {
	export type Props<P = unknown> = css.Props<typeof CardCss, P>;
}
