import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.slots([
		"root",
		"label",
		"icon",
	])
	.variants({
		size: [
			"xs",
			"sm",
			"md",
			"lg",
		],
		theme: [
			"light",
			"dark",
		],
	})
	.tokens([
		"color",
		"bg",
		"border",
		"shadow",
	])
	.def()
	.defaults({
		size: "md",
		theme: "light",
	})
	.token({
		color: {
			class: [
				"color",
			],
		},
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
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/multiple clear override combinations", () => {
	it("should handle complex sequence of clear and override flags", () => {
		const out = tweaks<TestContract>([
			{
				// Initial setup
				variant: {
					size: "xs",
					theme: "light",
				},
				slot: {
					root: {
						class: [
							"initial-root",
						],
					},
					label: {
						class: [
							"initial-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"initial-color",
						],
					},
				},
			},
			{
				// First override - should merge with initial
				override: true,
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"override1-root",
						],
					},
					icon: {
						class: [
							"override1-icon",
						],
					},
				},
				token: {
					bg: {
						class: [
							"override1-bg",
						],
					},
				},
			},
			{
				// First clear - should reset everything
				clear: true,
				variant: {
					size: "md",
					theme: "dark",
				},
				slot: {
					root: {
						class: [
							"clear1-root",
						],
					},
				},
				token: {
					border: {
						class: [
							"clear1-border",
						],
					},
				},
			},
			{
				// Normal merge after clear
				slot: {
					label: {
						class: [
							"merge1-label",
						],
					},
				},
				token: {
					shadow: {
						class: [
							"merge1-shadow",
						],
					},
				},
			},
			{
				// Second override - should replace merged values
				override: true,
				variant: {
					size: "lg",
				},
				slot: {
					icon: {
						class: [
							"override2-icon",
						],
					},
				},
				token: {
					color: {
						class: [
							"override2-color",
						],
					},
					shadow: {
						class: [
							"override2-shadow",
						],
					},
				},
			},
			{
				// Second clear - should reset again
				clear: true,
				variant: {
					theme: "light",
				},
				slot: {
					root: {
						class: [
							"clear2-root",
						],
					},
					label: {
						class: [
							"clear2-label",
						],
					},
				},
				token: {
					bg: {
						class: [
							"clear2-bg",
						],
					},
				},
			},
			{
				// Final normal merge
				slot: {
					icon: {
						class: [
							"final-icon",
						],
					},
				},
				token: {
					border: {
						class: [
							"final-border",
						],
					},
				},
			},
		]);

		// Should only contain values from the last clear and subsequent merge
		expect(out.variant?.size).toBeUndefined(); // Not set in last clear or after
		expect(out.variant?.theme).toBe("light"); // From last clear tweak

		expect(out.slot?.root).toEqual({
			class: [
				"clear2-root",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"clear2-label",
			],
		});
		expect(out.slot?.icon).toEqual({
			class: [
				"final-icon",
			],
		});

		expect(out.token?.color).toBeUndefined(); // Not set in last clear or after
		expect(out.token?.bg).toEqual({
			class: [
				"clear2-bg",
			],
		});
		expect(out.token?.border).toEqual({
			class: [
				"final-border",
			],
		});
		expect(out.token?.shadow).toBeUndefined(); // Not set in last clear or after
	});
});
