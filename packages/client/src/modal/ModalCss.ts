import { css } from "@use-pico/common";

export const ModalCss = css({
	slot: {
		base: [
			"bg-slate-500",
			"bg-opacity-75",
			"backdrop-blur-sm",
			"flex",
			"justify-center",
			"py-12",
		],
		target: [],
		modal: [
			"bg-white",
			"rounded",
			"shadow-lg",
			"p-4",
			"w-fit",
			"h-fit",
			"max-h-full",
			"overflow-y-auto",
			"relative",
			"w-2/3",
			"max-w-1/2",
		],
	},
	variant: {
		disabled: {
			true: ["pointer-events-none"],
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
