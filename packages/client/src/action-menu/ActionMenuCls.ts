import { cls } from "@use-pico/common";

export const ActionMenuCls = cls({
	slot: {
		base: [
			"p-1",
			"bg-slate-50",
			"border",
			"border-slate-300",
			"rounded-sm",
			"shadow-md",
			"text-slate-500",
			"flex",
			"flex-col",
			"gap-2",
		],
	},
	variant: {},
	defaults: {},
});

export namespace ActionMenuCls {
	export type Props<P = unknown> = cls.Props<typeof ActionMenuCls, P>;
}
