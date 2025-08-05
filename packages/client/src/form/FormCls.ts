import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const FormCls = cls({
	slot: {
		base: [
			"border",
			"border-gray-300",
			"rounded-md",
			"p-4",
			"flex",
			"flex-col",
			"gap-2",
			"items-center",
		],
		fieldset: [
			"flex",
			"flex-col",
			"gap-4",
			"w-full",
			"p-4",
		],
		legend: [
			"font-bold",
			"text-lg",
			"p-1",
			"border-b",
			"border-slate-400",
			"w-full",
		],
		input: [
			"w-full",
			"border",
			"border-gray-300",
			"rounded-md",
			"p-2",
			"focus:outline-hidden",
			"focus:ring-2",
			"focus:ring-blue-500",
			"focus:border-transparent",
		],
	},
	variant: {
		isSubmitting: {
			true: [],
		},
	},
	match: [
		{
			if: {
				isSubmitting: true,
			},
			do: {
				base: [
					"opacity-50",
					"pointer-events-none",
					"select-none",
				],
			},
		},
	],
	defaults: {
		isSubmitting: false,
	},
});
export type FormCls = typeof FormCls;

export namespace FormCls {
	export type Props<P = unknown> = ClsProps<FormCls, P>;

	export type Slots = ClsSlots<FormCls>;
}
