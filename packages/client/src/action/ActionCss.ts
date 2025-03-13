import { css } from "@use-pico/common";

export const ActionCss = css({
	slot: {
		base: [
			"pico--action",
			"pico--color-subtle",
			"flex",
			"items-center",
			"justify-center",
			"gap-2",
			"group",
			"w-fit",
			"h-fit",
			"rounded-sm",
			"cursor-pointer",
			"shadow-(--color-shadow)",
			"hover:shadow-md",
			"hover:shadow-(--color-shadow-hover)",
			"transition-all",
			"hover:bg-(--color-bg-hover)",
			"text-(--color-text)",
			"text-2xl",
			"p-1",
		],
	},
	variant: {
		disabled: {
			true: ["cursor-not-allowed", "pointer-events-none"],
		},
		loading: {
			true: ["cursor-not-allowed", "pointer-events-none"],
		},
		active: {
			true: [],
		},
	},
	match: [
		{
			if: {
				disabled: true,
			},
			then: {
				base: ["opacity-50", "hover:bg-(--color-disabled-hover-bg)"],
			},
		},
		{
			if: {
				active: true,
			},
			then: {
				base: ["bg-(--color-active-bg)", "hover:bg-(--color-active-hover-bg)"],
			},
		},
	],
	defaults: {
		disabled: false,
		loading: false,
		active: false,
	},
});

export namespace ActionCss {
	export type Props<P = unknown> = css.Props<typeof ActionCss, P>;
}
