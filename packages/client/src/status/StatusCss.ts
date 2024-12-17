import { css } from "@use-pico/common";

export const StatusCss = css({
	slot: {
		base: ["w-full", "flex", "flex-col", "items-center", "justify-center"],
		title: ["text-xl", "text-bold"],
		message: ["text-base", "text-slate-500"],
		body: ["pt-2"],
	},
	variant: {},
	defaults: {},
});

export namespace StatusCss {
	export type Props<P = unknown> = css.Props<typeof StatusCss, P>;
}
