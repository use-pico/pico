import { css } from "@use-pico/common";

export const AppLayoutCss = css({
	slot: {
		base: [],
		header: [
			"flex",
			"flex-row",
			"items-center",
			"bg-slate-50",
			"shadow-sm",
			"border-b",
			"border-b-slate-200",
			"w-full",
			"gap-4",
			"p-4",
		],
		content: ["min-h-screen", "border-b", "border-b-slate-200", "mb-4", "p-2"],
	},
	variant: {},
	defaults: {},
});

export namespace AppLayoutCss {
	export type Props<P = unknown> = css.Props<typeof AppLayoutCss, P>;
}
