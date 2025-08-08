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
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
				"pico--value-of",
				"border",
				"border-(--color-border)",
				"px-2",
				"py-1",
				"rounded-md",
				"group",
			]),
			label: classes([
				"text-sm",
				"font-semibold",
				"text-(--label-color-text)",
				"border-b",
				"border-(--label-color-border)",
				"group-hover:border-(--label-color-hover-border)",
				"mb-2",
			]),
			value: classes([]),
		}),
		rule(
			{
				inline: true,
			},
			{
				base: classes([
					"border-none",
					"flex",
					"flex-row",
					"items-center",
					"gap-2",
				]),
				label: classes([
					"mb-0",
					"font-light",
					"text-md",
					"text-(--inline-label-color-text)",
					"border-none",
				]),
				value: classes([
					"text-md",
					"text-(--inline-value-color-text)",
				]),
			},
		),
		rule(
			{
				withBackground: true,
			},
			{
				base: classes([
					"bg-(--color-bg)",
					"hover:bg-(--color-hover-bg)",
					"hover:border-(--color-hover-border)",
				]),
			},
		),
	],
	defaults: {
		inline: false,
		withBackground: true,
	},
});

export namespace ValueOfCls {
	export type Props<P = unknown> = Component<typeof ValueOfCls, P>;
}
