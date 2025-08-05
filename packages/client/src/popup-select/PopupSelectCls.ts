import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const PopupSelectCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
		],
		input: [
			"py-2",
			"px-2",
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"cursor-pointer",
			"hover:bg-slate-50",
			"border",
			"border-gray-300",
			"rounded-md",
			"text-slate-400",
			"hover:text-slate-700",
			"focus:outline-hidden",
			"focus:ring-2",
			"focus:ring-blue-500",
			"focus:border-transparent",
		],
		content: [],
	},
	variant: {
		loading: {
			true: [],
		},
		selected: {
			true: [],
		},
	},
	match: [
		{
			if: {
				loading: true,
			},
			do: {
				input: [
					"text-slate-300",
					"cursor-progress",
				],
			},
		},
		{
			if: {
				selected: true,
			},
			do: {
				input: [
					"bg-slate-50",
					"text-slate-700",
					"hover:bg-slate-100",
					"hover:text-slate-800",
				],
			},
		},
	],
	defaults: {
		loading: false,
		selected: false,
	},
});
export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = ClsProps<PopupSelectCls, P>;

	export type Slots = ClsSlots<PopupSelectCls>;
}
