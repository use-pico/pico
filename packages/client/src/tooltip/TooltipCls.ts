import { type Component, classes, component } from "@use-pico/cls";

export const TooltipCls = component({
	slots: [
		"base",
	],
	root: {
		base: classes([
			"border",
			"border-sky-400",
			"bg-sky-50",
			"text-sky-600",
			"rounded-lg",
			"px-4",
			"py-2",
			"shadow-md",
		]),
	},
	defaults: {},
});

export namespace TooltipCls {
	export type Props<P = unknown> = Component<typeof TooltipCls, P>;
}
