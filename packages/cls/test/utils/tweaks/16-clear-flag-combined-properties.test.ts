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
			"sm",
			"md",
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
		color: {
			class: [
				"color",
			],
		},
	})
	.defaults({
		size: "md",
		theme: "light",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/clear flag combined properties", () => {
	it("clear flag should reset all properties (tokens, slots, variants) and keep only clear tweak values", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "sm",
					theme: "dark",
				},
				slot: {
					root: {
						class: [
							"old-root",
						],
					},
					label: {
						class: [
							"old-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"old-color",
						],
					},
					bg: {
						class: [
							"old-bg",
						],
					},
				},
			},
			{
				clear: true,
				variant: {
					size: "md",
				},
				slot: {
					icon: {
						class: [
							"clear-icon",
						],
					},
				},
				token: {
					border: {
						class: [
							"clear-border",
						],
					},
					shadow: {
						class: [
							"clear-shadow",
						],
					},
				},
			},
		]);

		// Only clear tweak values should remain
		expect(out.variant?.size).toBe("md");
		expect(out.variant?.theme).toBeUndefined(); // Not set in clear tweak
		expect(out.slot?.root).toBeUndefined(); // Not set in clear tweak
		expect(out.slot?.label).toBeUndefined(); // Not set in clear tweak
		expect(out.slot?.icon).toEqual({
			class: [
				"clear-icon",
			],
		});
		expect(out.token?.color).toBeUndefined(); // Not set in clear tweak
		expect(out.token?.bg).toBeUndefined(); // Not set in clear tweak
		expect(out.token?.border).toEqual({
			class: [
				"clear-border",
			],
		});
		expect(out.token?.shadow).toEqual({
			class: [
				"clear-shadow",
			],
		});
	});
});
