import { type Component, variant } from "@use-pico/cls";

export const PopupSelectCls = variant({
	slots: [
		"base",
		"input",
		"content",
	],
	variants: {
		loading: [
			"bool",
		],
		selected: [
			"bool",
		],
	},
	rule: [
		{
			slot: {
				base: {
					class: [
						"flex",
						"flex-col",
						"gap-2",
					],
				},
				input: {
					class: [
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
				},
				content: {
					class: [],
				},
			},
		},
		{
			match: {
				loading: true,
			},
			slot: {
				input: {
					class: [
						"text-slate-300",
						"cursor-progress",
					],
				},
			},
		},
		{
			match: {
				selected: true,
			},
			slot: {
				input: {
					class: [
						"bg-slate-50",
						"text-slate-700",
						"hover:bg-slate-100",
						"hover:text-slate-800",
					],
				},
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
	export type Props<P = unknown> = Component<PopupSelectCls, P>;
}
