import { css } from "@use-pico/common";

export const BadgeCss = css({
	slot: {
		base: [
			"pico--badge",
			"bg-(--color-bg)",
			"border-(--color-border)",
			"border",
			"flex-row",
			"flex",
			"font-bold",
			"gap-2",
			"items-center",
			"px-4",
			"py-1",
			"rounded-2xl",
			"text-(--color-text)",
			"text-sm",
		],
	},
	match: [
		{
			if: {
				active: true,
			},
			then: {
				base: ["shadow-md"],
			},
		},
	],
	variant: {
		active: {
			true: [],
		},
		variant: {
			primary: ["color-primary"],
			secondary: ["color-secondary"],
			danger: ["color-danger"],
			light: ["color-light"],
			subtle: ["color-subtle"],
		},
	},
	defaults: {
		active: false,
		variant: "light",
	},
});

export namespace BadgeCss {
	export type Props<P = unknown> = css.Props<typeof BadgeCss, P>;
}
