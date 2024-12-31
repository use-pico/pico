import { css } from "@use-pico/common";

export const IconCss = css({
	slot: {
		base: [],
	},
	variant: {
		size: {
			"xs": "text-sm",
			"sm": "text-sm",
			"md": "text-base",
			"lg": "text-lg",
			"xl": "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
			"5xl": "text-5xl",
			"6xl": "text-6xl",
			"7xl": "text-7xl",
			"8xl": "text-8xl",
		},
		disabled: {
			true: [],
		},
	},
	match: [
		{
			if: {
				disabled: true,
			},
			then: {
				base: [
					"pointer-events-none",
					"cursor-not-allowed",
					"text-gray-400",
					"opacity-50",
				],
			},
		},
	],
	defaults: {
		size: "xl",
		disabled: false,
	},
});

export namespace IconCss {
	export type Props<P = unknown> = css.Props<typeof IconCss, P>;
}
