import { css } from "@use-pico/common";

export const BaseBuildingListCss = css({
	slot: {
		base: ["flex", "flex-col", "gap-2"],
		item: [
			"flex",
			"flex-col",
			"gap-2",
			"bg-slate-50",
			"hover:bg-slate-100",
			"border",
			"border-slate-300",
			"hover:border-slate-400",
			"p-2",
			"rounded-lg",
		],
		title: ["font-bold"],
	},
	variant: {},
	defaults: {},
});

export namespace BaseBuildingListCss {
	export type Props<P = unknown> = css.Props<typeof BaseBuildingListCss, P>;
}
