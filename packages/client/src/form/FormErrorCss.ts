import { css } from "@use-pico/common";

export const FormErrorCss = css({
	slot: {
		base: ["flex", "flex-row", "gap-1", "items-center", "text-red-600", "p-2"],
	},
	variant: {
		highlight: {
			true: [],
		},
		compact: {
			true: [],
		},
	},
	match: [
		{
			if: {
				highlight: true,
			},
			then: {
				base: [
					"bg-red-100",
					"p-2",
					"font-bold",
					"border",
					"border-red-200",
					"rounded-md",
					"w-full",
				],
			},
		},
		{
			if: {
				compact: true,
			},
			then: {
				base: ["p-0"],
			},
		},
	],
	defaults: {
		highlight: false,
		compact: false,
	},
});

export namespace FormErrorCss {
	export type Props<P = unknown> = css.Props<typeof FormErrorCss, P>;
}
