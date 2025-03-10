import { css } from "@use-pico/common";

export const ValueOfCss = css({
	slot: {
		base: [
			"border",
			"border-(--value-of-color-border)",
			"px-2",
			"py-1",
			"rounded-md",
			"group",
		],
		label: [
			"text-sm",
			"font-semibold",
			"text-(--value-of-label-color-text)",
			"border-b",
			"border-(--value-of-label-color-border)",
			"group-hover:border-(--value-of-label-color-hover-border)",
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
					"text-(--value-of-inline-label-color-text)",
					"border-none",
				],
				value: ["text-md", "text-(--value-of-inline-value-color-text)"],
			},
		},
		{
			if: {
				withBackground: true,
			},
			then: {
				base: [
					"bg-(--value-of-color-bg)",
					"hover:bg-(--value-of-color-hover-bg)",
					"hover:border-(--value-of-color-hover-border)",
				],
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
