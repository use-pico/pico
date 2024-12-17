import { css } from "@use-pico/common";

export const ActionCss = css({
	slot: {
		base: [
			"flex",
			"items-center",
			"justify-center",
			"gap-2",
			"group",
			"w-fit",
			"h-fit",
			"rounded",
			"cursor-pointer",
			"hover:shadow-md",
			"hover:shadow-slate-200",
			"transition-all",
			"hover:bg-slate-200",
			"text-slate-600",
			"text-2xl",
			"p-1",
		],
	},
	variant: {
		disabled: {
			true: ["cursor-not-allowed", "pointer-events-none"],
		},
		loading: {
			true: ["cursor-not-allowed", "pointer-events-none"],
		},
	},
	match: [
		{
			if: {
				disabled: true,
			},
			then: {
				base: ["opacity-50", "hover:bg-blue-400"],
			},
		},
	],
	defaults: {
		disabled: false,
		loading: false,
	},
});

export namespace ActionCss {
	export type Props<P = unknown> = css.Props<typeof ActionCss, P>;
}
