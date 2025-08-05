import { type ClsProps, type ClsSlots, cls } from "@use-pico/cls";

export const JustDropZoneCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-2",
			"items-center",
			"justify-center",
			"w-full",
		],
		label: [
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
			"w-full",
			"h-64",
			"border-2",
			"border-gray-300",
			"border-dashed",
			"rounded-lg",
			"cursor-pointer",
			"bg-gray-50",
			"hover:bg-gray-100",
		],
		zone: [
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
			"pt-5",
			"pb-6",
			"text-slate-500",
		],
	},
	variant: {
		active: {
			true: [],
		},
		rejected: {
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
					"text-blue-400",
				],
				zone: [
					"text-blue-400",
				],
			},
		},
		{
			if: {
				rejected: true,
			},
			do: {
				label: [
					"text-red-400",
				],
				zone: [
					"text-red-400",
				],
			},
		},
	],
	defaults: {
		active: false,
		rejected: false,
	},
});
export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = ClsProps<JustDropZoneCls, P>;

	export type Slots = ClsSlots<JustDropZoneCls>;
}
