import { css } from "@use-pico/common";

export const PopupSelectCss = css({
	slot: {
		base: ["flex", "flex-col", "gap-2"],
		input: [
			"py-2",
			"px-4",
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"cursor-pointer",
			"hover:bg-slate-50",
			"border",
			"border-gray-300",
			"rounded-md",
			"text-slate-400",
			"hover:text-slate-700",
			"focus:outline-none",
			"focus:ring-2",
			"focus:ring-blue-500",
			"focus:border-transparent",
		],
		content: [],
		footer: [
			"flex",
			"items-center",
			"justify-between",
			"gap-2",
			"border-t-2",
			"border-slate-100",
			"mt-4",
			"pt-2",
		],
	},
	variant: {
		loading: {
			true: [],
		},
	},
	match: [
		{
			if: {
				loading: true,
			},
			then: {
				input: ["text-slate-300"],
			},
		},
	],
	defaults: {
		loading: false,
	},
});

export namespace PopupSelectCss {
	export type Props<P = unknown> = css.Props<typeof PopupSelectCss, P>;
}
