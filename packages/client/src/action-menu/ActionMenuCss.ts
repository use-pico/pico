import { css } from "@use-pico/common";

export const ActionMenuCss = css({
	slot: {
		base: [
			"p-2",
			"bg-white",
			"rounded",
			"shadow-md",
			"text-slate-500",
			"flex",
			"flex-col",
			"gap-2",
		],
	},
	variant: {},
	defaults: {},
});

export namespace ActionMenuCss {
	export type Props<P = unknown> = css.Props<typeof ActionMenuCss, P>;
}
