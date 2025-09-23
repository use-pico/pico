import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.slots([
		"root",
		"label",
		"icon",
		"content",
	])
	.variants({
		size: [
			"xs",
			"sm",
			"md",
			"lg",
			"xl",
		],
		theme: [
			"light",
			"dark",
			"auto",
		],
		variant: [
			"solid",
			"outline",
			"ghost",
		],
	})
	.tokens([
		"color",
		"bg",
		"border",
		"shadow",
		"spacing",
		"radius",
	])
	.def()
	.token({
		bg: {
			class: [
				"bg",
			],
		},
		border: {
			class: [
				"border",
			],
		},
		shadow: {
			class: [
				"shadow",
			],
		},
		spacing: {
			class: [
				"spacing",
			],
		},
		radius: {
			class: [
				"radius",
			],
		},
		color: {
			class: [
				"color",
			],
		},
	})
	.defaults({
		size: "md",
		theme: "light",
		variant: "solid",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/clear flag complex structures", () => {
	it("clear flag should handle complex nested structures with multiple slots and tokens", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "xs",
					theme: "dark",
					variant: "outline",
				},
				slot: {
					root: {
						class: [
							"old-root-base",
							"old-root-theme",
						],
					},
					label: {
						class: [
							"old-label-base",
						],
					},
					icon: {
						class: [
							"old-icon-base",
							"old-icon-size",
						],
					},
					content: {
						class: [
							"old-content-base",
							"old-content-padding",
						],
					},
				},
				token: {
					color: {
						class: [
							"old-color-primary",
							"old-color-secondary",
						],
					},
					bg: {
						class: [
							"old-bg-base",
							"old-bg-hover",
						],
					},
					border: {
						class: [
							"old-border-base",
						],
					},
					shadow: {
						class: [
							"old-shadow-base",
							"old-shadow-hover",
						],
					},
					spacing: {
						class: [
							"old-spacing-base",
						],
					},
					radius: {
						class: [
							"old-radius-base",
							"old-radius-sm",
						],
					},
				},
			},
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"additional-root",
						],
					},
				},
				token: {
					color: {
						class: [
							"additional-color",
						],
					},
				},
			},
			{
				clear: true,
				variant: {
					size: "lg",
					theme: "auto",
				},
				slot: {
					root: {
						class: [
							"clear-root-fresh",
						],
					},
					content: {
						class: [
							"clear-content-fresh",
							"clear-content-new",
						],
					},
				},
				token: {
					border: {
						class: [
							"clear-border-fresh",
						],
					},
					radius: {
						class: [
							"clear-radius-fresh",
						],
					},
				},
			},
			{
				variant: {
					variant: "ghost",
				},
				slot: {
					label: {
						class: [
							"final-label",
						],
					},
				},
				token: {
					shadow: {
						class: [
							"final-shadow",
						],
					},
				},
			},
		]);

		// Should only contain values from clear tweak and subsequent tweaks
		expect(out.variant?.size).toBe("lg"); // From clear tweak
		expect(out.variant?.theme).toBe("auto"); // From clear tweak
		expect(out.variant?.variant).toBe("ghost"); // From final tweak

		expect(out.slot?.root).toEqual({
			class: [
				"clear-root-fresh",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"final-label",
			],
		});
		expect(out.slot?.icon).toBeUndefined(); // Not set in clear or after
		expect(out.slot?.content).toEqual({
			class: [
				"clear-content-fresh",
				"clear-content-new",
			],
		});

		expect(out.token?.color).toBeUndefined(); // Not set in clear or after
		expect(out.token?.bg).toBeUndefined(); // Not set in clear or after
		expect(out.token?.border).toEqual({
			class: [
				"clear-border-fresh",
			],
		});
		expect(out.token?.shadow).toEqual({
			class: [
				"final-shadow",
			],
		});
		expect(out.token?.spacing).toBeUndefined(); // Not set in clear or after
		expect(out.token?.radius).toEqual({
			class: [
				"clear-radius-fresh",
			],
		});
	});
});
