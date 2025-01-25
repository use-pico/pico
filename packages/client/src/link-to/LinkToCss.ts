import { css } from "@use-pico/common";

export const LinkToCss = css({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"justify-between",
			"text-blue-500",
			"rounded-sm",
			"px-1",
			"py-0.5",
			"hover:text-blue-700",
			"focus:outline-hidden",
			"w-fit",
		],
	},
	variant: {},
	defaults: {},
});

export namespace LinkToCss {
	export type Props<P = unknown> = css.Props<typeof LinkToCss, P>;
}
