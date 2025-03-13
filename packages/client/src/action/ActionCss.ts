import { css } from "@use-pico/common";

export const ActionCss = css({
	slot: {
		base: ["pico--action", "w-fit", "h-fit"],
		action: [
			"bg-(--color-bg)",
			"border-(--color-border)",
			"border",
			"cursor-pointer",
			"flex",
			"gap-2",
			"group",
			"h-fit",
			"hover:bg-(--color-bg-hover)",
			"hover:border-(--color-border-hover)",
			"hover:shadow-(--color-shadow-hover)",
			"hover:shadow-md",
			"hover:text-(--color-text-hover)",
			"items-center",
			"justify-center",
			"p-1",
			"rounded-sm",
			"rounded",
			"shadow-(--color-shadow)",
			"text-(--color-text)",
			"text-2xl",
			"transition-all",
			"w-fit",
		],
	},
	variant: {
		disabled: {
			true: ["cursor-not-allowed"],
		},
		loading: {
			true: ["cursor-not-allowed"],
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
				base: ["opacity-50", "cursor-not-allowed"],
				action: ["pointer-events-none"],
			},
		},
		{
			if: {
				loading: true,
			},
			then: {
				action: ["pointer-events-none"],
			},
		},
		{
			if: {
				active: true,
			},
			then: {
				action: [
					"bg-(--color-active-bg)",
					"border-(--color-active-border)",
					"hover:bg-(--color-active-bg-hover)",
					"hover:border-(--color-active-border-hover)",
					"hover:shadow-(--color-active-shadow-hover)",
					"hover:text-(--color-active-text-hover)",
					"shadow-(--color-active-shadow)",
					"shadow-md",
				],
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
