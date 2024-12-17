import { css } from "@use-pico/common";
import { MenuLinkCss } from "./MenuLinkCss";

export const MenuLinkSubtleCss = css({
	use: MenuLinkCss,
	slot: {
		base: ["text-slate-600", "hover:text-slate-800"],
	},
	variant: {},
	match: [
		{
			if: {
				active: true,
				inner: false,
			},
			then: {
				base: [
					"border-slate-200",
					"bg-slate-50",
					"hover:border-slate-300",
					"text-slate-800",
					"hover:text-slate-900",
				],
			},
		},
		{
			if: {
				active: true,
				inner: true,
			},
			then: {
				base: ["border-none", "text-blue-600", "hover:text-blue-800"],
			},
		},
	],
	defaults: {},
});

export namespace MenuLinkSubtleCss {
	export type Props<P = unknown> = css.Props<typeof MenuLinkSubtleCss, P>;
}
