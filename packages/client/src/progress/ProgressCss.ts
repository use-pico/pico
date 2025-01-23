import { css } from "@use-pico/common";

export const ProgressCss = css({
	slot: {
		base: ["w-full", "bg-slate-200", "rounded", "transition-all"],
		progress: [
			"h-full",
			"bg-blue-400",
			"rounded",
			"leading-none",
			"transition-all",
		],
	},
	variant: {
		size: {
			xs: "h-0.5",
			sm: "h-1",
			md: "h-2",
			lg: "h-4",
		},
	},
	defaults: {
		size: "md",
	},
});

export namespace ProgressCss {
	export type Props<P = unknown> = css.Props<typeof ProgressCss, P>;
}