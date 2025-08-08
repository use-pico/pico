import { type Component, variant } from "@use-pico/cls";

export const ValueOfCls = variant({
	slots: [
		"base",
		"label",
		"value",
	],
	variants: {
		inline: [
			"bool",
		],
		withBackground: [
			"bool",
		],
	},
	rule: [
		{
			slot: {
				base: {
					class: [
						"pico--value-of",
						"border",
						"border-(--color-border)",
						"px-2",
						"py-1",
						"rounded-md",
						"group",
					],
				},
				label: {
					class: [
						"text-sm",
						"font-semibold",
						"text-(--label-color-text)",
						"border-b",
						"border-(--label-color-border)",
						"group-hover:border-(--label-color-hover-border)",
						"mb-2",
					],
				},
				value: {
					class: [],
				},
			},
		},
		{
			match: {
				inline: true,
			},
			slot: {
				base: {
					class: [
						"border-none",
						"flex",
						"flex-row",
						"items-center",
						"gap-2",
					],
				},
				label: {
					class: [
						"mb-0",
						"font-light",
						"text-md",
						"text-(--inline-label-color-text)",
						"border-none",
					],
				},
				value: {
					class: [
						"text-md",
						"text-(--inline-value-color-text)",
					],
				},
			},
		},
		{
			match: {
				withBackground: true,
			},
			slot: {
				base: {
					class: [
						"bg-(--color-bg)",
						"hover:bg-(--color-hover-bg)",
						"hover:border-(--color-hover-border)",
					],
				},
			},
		},
	],
	defaults: {
		inline: false,
		withBackground: true,
	},
});

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<typeof ValueOfCls, P>;
}
