import { css } from "@use-pico/common";

export const ValueOfCss = css({
	slot: {
		base: ["border", "border-blue-100", "px-2", "py-1", "rounded-md"],
		label: [
			"text-sm",
			"font-semibold",
			"text-slate-600",
			"border-b",
			"border-blue-200",
			"mb-2",
		],
		value: [],
	},
	variant: {
		inline: {
			true: [],
		},
		withBackground: {
			true: [],
		},
	},
	match: [
		{
			if: {
				inline: true,
			},
			then: {
				base: ["border-none", "flex", "flex-row", "items-center", "gap-2"],
				label: [
					"mb-0",
					"font-light",
					"text-md",
					"text-slate-600",
					"border-none",
				],
				value: ["text-md", "text-slate-800"],
			},
		},
		{
			if: {
				withBackground: true,
			},
			then: {
				base: ["bg-blue-50", "hover:bg-blue-100", "hover:border-blue-300"],
			},
		},
	],
	defaults: {
		inline: false,
		withBackground: true,
	},
});

export namespace ValueOfCss {
	export type Props<P = unknown> = css.Props<typeof ValueOfCss, P>;
}
