import { cls } from "@use-pico/common";

export const ModalCls = cls({
	slot: {
		base: [
			"bg-slate-400/75",
			"backdrop-blur-xs",
			"flex",
			"justify-center",
			"py-12",
		],
		target: [],
		modal: [
			"bg-white",
			"rounded-lg",
			"shadow-lg",
			"p-4",
			"max-h-full",
			"h-fit",
			"flex",
			"flex-col",
			"gap-2",
			"w-2/3",
		],
	},
	variant: {
		disabled: {
			true: [
				"pointer-events-none",
				"cursor-not-allowed",
			],
		},
		loading: {
			true: [],
		},
	},
	match: [
		{
			if: {
				loading: true,
			},
			do: {
				base: [
					"pointer-events-none",
					"opacity-50",
				],
			},
		},
	],
	defaults: {
		disabled: false,
		loading: false,
	},
});

export namespace ModalCls {
	export type Props<P = unknown> = cls.Props<typeof ModalCls, P>;
}
