import { type ClsProps, cls } from "@use-pico/cls";

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
	export type Props<P = unknown> = ClsProps<typeof MenuCls, P>;
}
