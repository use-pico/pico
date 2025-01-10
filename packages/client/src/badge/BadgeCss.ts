import { css } from "@use-pico/common";

export const BadgeCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"rounded-2xl",
			"bg-blue-50",
			"border",
			"border-blue-200",
			"text-xs",
			"px-4",
			"py-0.5",
			"font-bold",
		],
	},
	variant: {},
	defaults: {},
});

export namespace BadgeCss {
	export type Props<P = unknown> = css.Props<typeof BadgeCss, P>;
}
