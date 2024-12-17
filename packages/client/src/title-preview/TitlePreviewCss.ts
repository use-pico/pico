import { css } from "@use-pico/common";

export const TitlePreviewCss = css({
	slot: {
		base: ["flex", "flex-row", "gap-2", "items-center"],
		title: ["flex", "flex-row", "gap-2", "items-center", "text-lg", "text-slate-500"],
		subtitle: ["flex", "flex-row", "gap-4", "items-center", "text-lg"],
	},
	variant: {
		withSubtitle: {
			true: [],
		},
	},
	match: [
		{
			if: {
				withSubtitle: true,
			},
			then: {
				title: ["border-r", "border-r-slate-300", "pr-2"],
			},
		},
	],
	defaults: {
		withSubtitle: false,
	},
});

export namespace TitlePreviewCss {
	export type Props<P = unknown> = css.Props<typeof TitlePreviewCss, P>;
}
