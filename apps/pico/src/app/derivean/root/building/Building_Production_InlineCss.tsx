import { css } from "@use-pico/common";

export const Building_Production_InlineCss = css({
	slot: {
		item: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"bg-sky-100",
			"border",
			"rounded",
			"py-1",
			"px-2",
			"bg-sky-50",
			"border-sky-200",
			"text-sky-700",
		],
	},
	variant: {
		missing: {
			true: [],
		},
	},
	match: [
		{
			if: {
				missing: true,
			},
			then: {
				item: ["bg-amber-100", "border-amber-300"],
			},
		},
	],
	defaults: {
		missing: false,
	},
});

export namespace Building_Production_InlineCss {
	export type Props<P = unknown> = css.Props<
		typeof Building_Production_InlineCss,
		P
	>;
}
