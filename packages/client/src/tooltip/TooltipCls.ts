import { cls } from "@use-pico/cls";

export const TooltipCls = cls({
	slot: {
		base: [
			"border",
			"border-sky-400",
			"bg-sky-50",
			"text-sky-600",
			"rounded-lg",
			"px-4",
			"py-2",
			"shadow-md",
		],
	},
	variant: {},
	defaults: {},
});

export namespace TooltipCls {
	export type Props<P = unknown> = cls.Props<typeof TooltipCls, P>;
}
