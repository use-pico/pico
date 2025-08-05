import { cls } from "@use-pico/cls";

export const ActionMenuCls = cls({
	slot: {
		base: [
			"pico--action-menu-base",
			"p-1",
			"border",
			"rounded-sm",
			"shadow-md",
			"flex",
			"flex-col",
			"gap-2",
			// CSS Variables
			"bg-(--pico-bg-default)",
			"text-(--pico-text-default)",
			"border-(--pico-border-default)",
		],
	},
	variant: {},
	defaults: {},
});

export namespace ActionMenuCls {
	export type Props<P = unknown> = cls.Props<typeof ActionMenuCls, P>;
}
