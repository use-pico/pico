import { css } from "@use-pico/common";

export const BadgeCss = css({
	slot: {
		base: [
			"pico--badge",
			"pico--color-subtle",
			"bg-(--color-bg)",
			"border-(--color-border)",
			"border",
			"flex-row",
			"flex",
			"font-bold",
			"gap-2",
			"items-center",
			"px-4",
			"py-0.5",
			"rounded-2xl",
			"text-(--color-text)",
			"text-xs",
		],
	},
	variant: {},
	defaults: {},
});

export namespace BadgeCss {
	export type Props<P = unknown> = css.Props<typeof BadgeCss, P>;
}
