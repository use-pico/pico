import { css } from "@use-pico/common";

export const SelectCss = css({
	slot: {
		base: [
			"cursor-pointer",
			"bg-slate-50",
			"text-slate-900",
			"text-sm",
			"border",
			"border-slate-300",
			"rounded-sm",
			"focus:border-sky-400",
			"focus:outline-hidden",
			"p-2.5",
			"hover:shadow-md",
			"transition-all",
			"group",
		],
		input: ["flex", "flex-row", "items-center", "justify-between", "gap-2"],
		popup: [
			"z-50",
			"cursor-pointer",
			"overflow-y-auto",
			"rounded-sm",
			"border",
			"border-slate-300",
			"bg-white",
			"shadow-lg",
			"focus:outline-hidden",
		],
		item: [
			"focus:outline-hidden",
			"py-2",
			"px-2.5",
			"flex",
			"items-center",
			"justify-between",
		],
	},
	variant: {
		disabled: {
			true: [
				"cursor-not-allowed",
				"hover:shadow-none",
				"focus:border-slate-300",
				"opacity-50",
			],
		},
		active: {
			true: [],
		},
		selected: {
			true: [],
		},
	},
	match: [
		{
			if: {
				selected: true,
			},
			then: {
				item: ["bg-slate-100"],
			},
		},
		{
			if: {
				active: true,
			},
			then: {
				item: ["bg-slate-200"],
			},
		},
	],
	defaults: {
		disabled: false,
		selected: false,
		active: false,
	},
});

export namespace SelectCss {
	export type Props<P = unknown> = css.Props<typeof SelectCss, P>;
}
