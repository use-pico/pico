import { css } from "@use-pico/common";

export const TooltipCss = css({
	slot: {
		base: [
			"border",
			"border-sky-400",
			"bg-sky-50",
			"text-sky-600",
			"rounded-lg",
			"px-4",
			"py-2",
			"shadow-md",
		],
	},
	variant: {},
	defaults: {},
});

export namespace TooltipCss {
	export type Props<P = unknown> = css.Props<typeof TooltipCss, P>;
}
