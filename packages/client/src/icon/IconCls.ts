import { type Component, variant } from "@use-pico/cls";

export const IconCls = variant({
	slots: [
		"base",
	],
	variants: {
		size: [
			"xs",
			"sm",
			"md",
			"lg",
			"xl",
			"2xl",
			"3xl",
			"4xl",
			"5xl",
			"6xl",
			"7xl",
			"8xl",
		],
		disabled: [
			"bool",
		],
	},
	rules: [
		{
			match: {
				size: "xs",
			},
			slot: {
				base: {
					class: [
						"text-sm",
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
						"text-sm",
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
						"text-base",
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
						"text-lg",
					],
				},
			},
		},
		{
			match: {
				size: "xl",
			},
			slot: {
				base: {
					class: [
						"text-xl",
					],
				},
			},
		},
		{
			match: {
				size: "2xl",
			},
			slot: {
				base: {
					class: [
						"text-2xl",
					],
				},
			},
		},
		{
			match: {
				size: "3xl",
			},
			slot: {
				base: {
					class: [
						"text-3xl",
					],
				},
			},
		},
		{
			match: {
				size: "4xl",
			},
			slot: {
				base: {
					class: [
						"text-4xl",
					],
				},
			},
		},
		{
			match: {
				size: "5xl",
			},
			slot: {
				base: {
					class: [
						"text-5xl",
					],
				},
			},
		},
		{
			match: {
				size: "6xl",
			},
			slot: {
				base: {
					class: [
						"text-6xl",
					],
				},
			},
		},
		{
			match: {
				size: "7xl",
			},
			slot: {
				base: {
					class: [
						"text-7xl",
					],
				},
			},
		},
		{
			match: {
				size: "8xl",
			},
			slot: {
				base: {
					class: [
						"text-8xl",
					],
				},
			},
		},
		{
			match: {
				disabled: true,
			},
			slot: {
				base: {
					class: [
						"pointer-events-none",
						"cursor-not-allowed",
						"text-gray-400",
						"opacity-50",
					],
				},
			},
		},
	],
	defaults: {
		size: "xl",
		disabled: false,
	},
});

export namespace IconCls {
	export type Props<P = unknown> = Component<typeof IconCls, P>;
}
