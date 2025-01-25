import { css } from "@use-pico/common";

export const AppLayoutCss = css({
	slot: {
		base: ["min-h-screen", "flex", "flex-col"],
		header: [
			"flex",
			"flex-row",
			"items-center",
			"bg-slate-50",
			"shadow-xs",
			"border-b",
			"border-b-slate-200",
			"w-full",
			"gap-4",
			"p-4",
		],
		content: ["grow", "h-full", "border-b", "border-b-slate-200", "p-2"],
	},
	variant: {},
	defaults: {},
});

export namespace AppLayoutCss {
	export type Props<P = unknown> = css.Props<typeof AppLayoutCss, P>;
}
