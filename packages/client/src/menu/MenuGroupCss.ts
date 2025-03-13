import { css } from "@use-pico/common";

export const MenuGroupCss = css({
	slot: {
		base: ["pico--menu-group", "group", "relative", "cursor-pointer"],
		label: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"rounded-sm",
			"px-2",
			"py-1",
			"border",
			"border-b-2",
			"border-transparent",
			"hover:text-(--color-hover-text)",
		],
		items: [
			"flex",
			"flex-col",
			"w-max",
			"gap-2",
			"invisible",
			"absolute",
			"group-hover:visible",
			"shadow-md",
			"z-20",
			"bg-white",
			"px-4",
			"py-2",
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
				label: [
					"border",
					"border-b-2",
					"border-(--color-active-border)",
					"bg-blue-50",
					"hover:border-(--color-active-hover-border)",
					"text-(--color-active-text)",
					"hover:text-(--color-active-hover-text)",
				],
			},
		},
	],
	defaults: {
		active: false,
	},
});

export namespace MenuGroupCss {
	export type Props<P = unknown> = css.Props<typeof MenuGroupCss, P>;
}
