import { type Component, variant } from "@use-pico/cls";

export const ProgressCls = variant({
	slots: [
		"base",
		"progress",
	],
	variants: {
		size: [
			"xs",
			"sm",
			"md",
			"lg",
		],
	},
	rules: [
		{
			slot: {
				base: {
					class: [
						"h-full",
						"w-full",
						"bg-slate-200",
						"rounded-sm",
						"transition-all",
					],
				},
				progress: {
					class: [
						"h-full",
						"bg-blue-400",
						"rounded-sm",
						"leading-none",
						"transition-all",
					],
				},
			},
		},
		{
			match: {
				size: "xs",
			},
			slot: {
				base: {
					class: [
						"h-0.5",
					],
				},
			},
		},
		{
			match: {
				size: "sm",
			},
			slot: {
				base: {
					class: [
						"h-1",
					],
				},
			},
		},
		{
			match: {
				size: "md",
			},
			slot: {
				base: {
					class: [
						"h-2",
					],
				},
			},
		},
		{
			match: {
				size: "lg",
			},
			slot: {
				base: {
					class: [
						"h-4",
					],
				},
			},
		},
	],
	defaults: {
		size: "md",
	},
});
export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = Component<typeof ProgressCls, P>;
}
