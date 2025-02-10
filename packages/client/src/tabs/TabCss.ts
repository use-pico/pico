import { css } from "@use-pico/common";

export const TabCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"gap-1",
			"cursor-pointer",
			"text-slate-600",
			"border-sky-400",
			"border",
			"border-b-2",
			"border-transparent",
			"hover:border-b-sky-400",
			"py-1",
			"px-2",
			"rounded",
		],
	},
	variant: {
		active: {
			true: [],
		},
	},
	match: [
		{
			if: {
				active: true,
			},
			then: {
				base: [
					"cursor-default",
					"font-semibold",
					"text-slate-800",
					"border-sky-400",
					"bg-sky-50",
				],
			},
		},
	],
	defaults: {
		active: false,
	},
});

export namespace TabCss {
	export type Props<P = unknown> = css.Props<typeof TabCss, P>;
}
