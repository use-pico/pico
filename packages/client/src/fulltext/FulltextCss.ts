import { css } from "@use-pico/common";

export const FulltextCss = css({
	slot: {
		base: ["relative", "w-full"],
		search: [
			"absolute",
			"inset-y-0",
			"left-2",
			"flex",
			"items-center",
			"pointer-events-none",
			"text-slate-500",
		],
		input: [
			"pl-8",
			"py-1",
			"w-full",
			"bg-slate-50",
			"text-slate-900",
			"text-sm",
			"border",
			"border-slate-300",
			"rounded",
			"focus:border-sky-400",
			"focus:outline-none",
			"block",
		],
		clear: [
			"absolute",
			"inset-y-0",
			"right-2",
			"flex",
			"items-center",
			"cursor-pointer",
			"text-slate-300",
			"hover:text-slate-500",
		],
	},
	variant: {},
	defaults: {},
});

export namespace FulltextCss {
	export type Props<P = unknown> = css.Props<typeof FulltextCss, P>;
}
