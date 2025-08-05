import { type ClsProps, cls } from "@use-pico/cls";

export const MenuGroupCls = cls({
	slot: {
		base: [
			"pico--menu-group",
			"group",
			"relative",
			"cursor-pointer",
		],
		label: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"rounded-sm",
			"px-2",
			"py-1",
			"border",
			"border-b-2",
			"border-transparent",
			"hover:text-(--color-text-hover)",
			"hover:bg-(--color-bg-hover)",
			"hover:border-(--color-border-hover)",
		],
		items: [
			"flex",
			"flex-col",
			"w-max",
			"gap-2",
			"invisible",
			"absolute",
			"group-hover:visible",
			"shadow-md",
			"z-20",
			"bg-white",
			"px-4",
			"py-2",
		],
	},
	variant: {
		active: {
			true: [],
		},
	},
	match: [
		{
			if: {
				active: true,
			},
			do: {
				label: [
					"bg-(--color-active-bg)",
					"border-(--color-active-border)",
					"hover:border-(--color-active-border-hover)",
					"hover:text-(--color-active-text-hover)",
					"text-(--color-active-text)",
				],
			},
		},
	],
	defaults: {
		active: false,
	},
});

export namespace MenuGroupCls {
	export type Props<P = unknown> = ClsProps<typeof MenuGroupCls, P>;
}
