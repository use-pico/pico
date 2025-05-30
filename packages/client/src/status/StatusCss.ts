import { css } from "@use-pico/common";

export const StatusCss = css({
	slot: {
		base: ["w-full", "flex", "flex-col", "items-center", "justify-center"],
		title: ["text-xl", "text-bold", "w-full", "text-center"],
		message: ["text-base", "text-slate-500", "w-full", "text-center"],
		body: ["pt-2", "w-full"],
	},
	variant: {},
	defaults: {},
});

export namespace StatusCss {
	export type Props<P = unknown> = css.Props<typeof StatusCss, P>;
}
