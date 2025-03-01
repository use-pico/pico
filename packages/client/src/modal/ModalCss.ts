import { css } from "@use-pico/common";

export const ModalCss = css({
	slot: {
		base: [
			"bg-slate-400/75",
			"backdrop-blur-xs",
			"flex",
			"justify-center",
			"py-12",
		],
		target: [],
		modal: [
			"bg-white",
			"rounded-lg",
			"shadow-lg",
			"p-4",
			"max-h-full",
			"h-fit",
			"flex",
			"flex-col",
			"w-2/3",
		],
	},
	variant: {
		disabled: {
			true: ["pointer-events-none", "cursor-not-allowed"],
		},
		loading: {
			true: [],
		},
	},
	match: [
		{
			if: {
				loading: true,
			},
			then: {
				base: ["pointer-events-none", "opacity-50"],
			},
		},
	],
	defaults: {
		disabled: false,
		loading: false,
	},
});

export namespace ModalCss {
	export type Props<P = unknown> = css.Props<typeof ModalCss, P>;
}
