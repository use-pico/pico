import { css } from "@use-pico/common";

export const MoreCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"items-center",
			"gap-2",
			"text-sm",
			"font-semibold",
		],
		/**
		 * Preview item
		 */
		item: [
			"border",
			"border-blue-200",
			"bg-blue-50",
			"rounded-md",
			"px-2",
			"py-1",
		],
	},
	variant: {},
	defaults: {},
});

export namespace MoreCss {
	export type Props<P = unknown> = css.Props<typeof MoreCss, P>;
}
