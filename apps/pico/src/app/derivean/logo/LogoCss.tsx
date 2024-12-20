import { css } from "@use-pico/common";

export const LogoCss = css({
	slot: {
		base: [
			"text-orange-500",
			"font-bold",
			"text-2xl",
			"shadow-md",
			"hover:shadow-lg",
			"hover:text-orange-600",
			"rounded",
			"px-2",
			"py-1",
			"bg-slate-100",
		],
	},
	variant: {},
	defaults: {},
});

export namespace LogoCss {
	export type Props<P = unknown> = css.Props<typeof LogoCss, P>;
}
