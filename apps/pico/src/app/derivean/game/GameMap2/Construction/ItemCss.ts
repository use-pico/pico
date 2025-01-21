import { css } from "@use-pico/common";

export const ItemCss = css({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
			"rounded-md",
			"bg-white",
			"border",
			"border-slate-300",
			"p-2",
			"hover:bg-slate-100",
			"cursor-draggable",
		],
	},
	variant: {
		isDragging: {
			true: [],
		},
	},
	match: [
		{
			if: {
				isDragging: true,
			},
			then: {
				base: ["cursor-grabbing", "bg-slate-100"],
			},
		},
	],
	defaults: {
		isDragging: false,
	},
});

export namespace ItemCss {
	export type Props<P = unknown> = css.Props<typeof ItemCss, P>;
}
