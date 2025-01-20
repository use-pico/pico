import { css } from "@use-pico/common";

export const PanelCss = css({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-4",
			"w-4/12",
			"border-l-2",
			"border-slate-200",
			"shadow-sm",
			"relative",
			"max-h-screen",
		],
		title: [
			"flex",
			"flex-row",
			"justify-between",
			"items-center",
			"px-4",
			"py-2",
			"shadow-md",
		],
		content: [
			"flex",
			"flex-col",
			"gap-2",
			"max-h-full",
			"overflow-y-auto",
			"px-4",
		],
	},
	variant: {},
	defaults: {},
});

export namespace PanelCss {
	export type Props<P = unknown> = css.Props<typeof PanelCss, P>;
}
