import { css } from "@use-pico/common";

export const PreviewCss = css({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
			"bg-blue-50",
			"p-2",
			"rounded-md",
			"border",
			"border-blue-200",
		],
		container: ["flex", "flex-row", "items-center", "justify-between", "gap-1"],
		title: ["flex", "flex-row", "items-center", "gap-4"],
		links: ["flex", "flex-row", "items-center", "gap-4", "justify-end"],
		actions: ["flex", "flex-row", "items-center", "gap-4"],
		extra: ["flex", "flex-row", "gap-4", "justify-end"],
	},
	variant: {},
	defaults: {},
});

export namespace PreviewCss {
	export type Props<P = unknown> = css.Props<typeof PreviewCss, P>;
}
