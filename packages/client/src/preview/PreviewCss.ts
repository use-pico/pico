import { css } from "@use-pico/common";

export const PreviewCss = css({
	slot: {
		base: [
			"pico--preview",
			"flex",
			"flex-col",
			"gap-2",
			"bg-(--color-bg)",
			"p-2",
			"rounded-md",
			"border",
			"border-(--color-border)",
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
