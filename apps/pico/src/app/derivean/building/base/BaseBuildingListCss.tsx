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
		title: [
			"flex",
			"flex-row",
			"items-center",
			"gap-2",
			"font-bold",
			"text-lg",
		],
	},
	variant: {
		canBuild: {
			true: [],
		},
	},
	match: [
		{
			if: {
				canBuild: true,
			},
			then: {
				item: [
					"bg-emerald-50",
					"hover:bg-emerald-100",
					"border-emerald-300",
					"hover:border-emerald-400",
				],
			},
		},
	],
	defaults: {
		canBuild: false,
	},
});

export namespace BaseBuildingListCss {
	export type Props<P = unknown> = css.Props<typeof BaseBuildingListCss, P>;
}
