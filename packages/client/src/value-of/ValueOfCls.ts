import { type ClsProps, cls } from "@use-pico/cls";

export const ValueOfCls = cls({
	slot: {
		base: [
			"pico--value-of",
			"border",
			"border-(--color-border)",
			"px-2",
			"py-1",
			"rounded-md",
			"group",
		],
		label: [
			"text-sm",
			"font-semibold",
			"text-(--label-color-text)",
			"border-b",
			"border-(--label-color-border)",
			"group-hover:border-(--label-color-hover-border)",
			"mb-2",
		],
		value: [],
	},
	variant: {
		inline: {
			true: [],
		},
		withBackground: {
			true: [],
		},
	},
	match: [
		{
			if: {
				inline: true,
			},
			do: {
				base: [
					"border-none",
					"flex",
					"flex-row",
					"items-center",
					"gap-2",
				],
				label: [
					"mb-0",
					"font-light",
					"text-md",
					"text-(--inline-label-color-text)",
					"border-none",
				],
				value: [
					"text-md",
					"text-(--inline-value-color-text)",
				],
			},
		},
		{
			if: {
				withBackground: true,
			},
			do: {
				base: [
					"bg-(--color-bg)",
					"hover:bg-(--color-hover-bg)",
					"hover:border-(--color-hover-border)",
				],
			},
		},
	],
	defaults: {
		inline: false,
		withBackground: true,
	},
});

export namespace ValueOfCls {
	export type Props<P = unknown> = ClsProps<typeof ValueOfCls, P>;
}
