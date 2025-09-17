import { describe, expect, it } from "vitest";
import { contract, type Variant } from "../../../src";

describe("14.1 Contract Builder - Fluent API Basic", () => {
	it("should build a contract with fluent API using both singular and plural methods", () => {
		// Test the fluent builder API with mixed singular/plural calls
		const result = contract()
			.tokens([
				"color.primary",
				"color.secondary",
			])
			.slots([
				"root",
				"label",
			])
			.variants({
				size: [
					"sm",
					"md",
					"lg",
				],
			})
			.token("spacing.sm") // Add single token
			.slot("icon") // Add single slot
			.variant("tone", [
				"light",
				"dark",
			]) // Add single variant
			.variant("tone", [
				"foo",
				"bar",
			])
			.build();

		// Verify the contract structure
		expect(result.tokens).toEqual([
			"color.primary",
			"color.secondary",
			"spacing.sm",
		]);
		expect(result.slot).toEqual([
			"root",
			"label",
			"icon",
		]);
		expect(result.variant).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
			tone: [
				"light",
				"dark",
				"foo",
				"bar",
			],
		});

		const _foo: Variant.Optional<typeof result> = {
			tone: "bar",
			size: "md",
		};
		const _foo2: Variant.Optional<typeof result> = {
			tone: "light",
			size: "md",
		};

		// Test that variant values were merged, not overridden
		// Note: Type checking for merged variants is complex, focusing on runtime behavior

		// Verify contract has proper structure
		expect(result).toHaveProperty("tokens");
		expect(result).toHaveProperty("slot");
		expect(result).toHaveProperty("variant");

		// Verify it's a valid contract structure
		expect(typeof result.tokens).toBe("object");
		expect(Array.isArray(result.tokens)).toBe(true);
		expect(Array.isArray(result.slot)).toBe(true);
		expect(typeof result.variant).toBe("object");
	});
});
