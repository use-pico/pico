import { cls } from "@use-pico/common";

export const MenuCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
		],
	},
	variant: {
		vertical: {
			true: [],
		},
	},
	match: [
		{
			if: {
				vertical: true,
			},
			do: {
				base: [
					"flex-col",
					"items-start",
				],
			},
		},
	],
	defaults: {
		vertical: false,
	},
});

export namespace MenuCls {
	export type Props<P = unknown> = cls.Props<typeof MenuCls, P>;
}
