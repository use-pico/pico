import { cls } from "@use-pico/common";

export const FormErrorCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
		],
		error: [
			"flex",
			"flex-row",
			"gap-1",
			"items-center",
			"text-red-600",
			"p-2",
		],
	},
	variant: {
		highlight: {
			true: [],
		},
		compact: {
			true: [],
		},
	},
	match: [
		{
			if: {
				highlight: true,
			},
			do: {
				error: [
					"bg-red-100",
					"p-2",
					"font-bold",
					"border",
					"border-red-200",
					"rounded-md",
					"w-full",
				],
			},
		},
		{
			if: {
				compact: true,
			},
			do: {
				error: [
					"p-0",
				],
			},
		},
	],
	defaults: {
		highlight: false,
		compact: false,
	},
});
export type FormErrorCls = typeof FormErrorCls;

export namespace FormErrorCls {
	export type Props<P = unknown> = cls.Props<FormErrorCls, P>;

	export type Slots = cls.Slots<FormErrorCls>;
}
