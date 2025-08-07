import { type Component, cls } from "@use-pico/cls";

export const ValueOfCls = cls(
	{
		tokens: {
			variant: [],
			group: {},
		},
		slot: [
			"base",
			"label",
			"value",
		],
		variant: {
			inline: [
				"true",
				"false",
			],
			withBackground: [
				"true",
				"false",
			],
		},
	},
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
		variant: {
			inline: {
				true: {
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
				false: {},
			},
			withBackground: {
				true: {
					base: {
						class: [
							"bg-(--color-bg)",
							"hover:bg-(--color-hover-bg)",
							"hover:border-(--color-hover-border)",
						],
					},
				},
				false: {},
			},
		},
		defaults: {
			inline: "false",
			withBackground: "true",
		},
	},
);

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<typeof ValueOfCls, P>;
}
