import { css } from "@use-pico/common";

export const ButtonLinkCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"px-4",
			"py-2",
			"rounded-md",
			"text-md",
			"text-blue-400",
			"hover:text-blue-600",
		],
	},
	variant: {
		disabled: {
			true: ["cursor-not-allowed", "text-slate-400", "hover:text-slate-400"],
		},
	},
	defaults: {
		disabled: false,
	},
});

export namespace ButtonLinkCss {
	export type Props<P = unknown> = css.Props<typeof ButtonLinkCss, P>;
}
