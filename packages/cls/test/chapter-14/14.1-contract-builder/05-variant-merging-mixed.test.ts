import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Variant Merging Mixed", () => {
	it("should merge variants from both variants() and variant() methods", () => {
		const result = contract()
			.variants({
				tone: [
					"primary",
					"secondary",
				],
				size: [
					"xs",
				],
			})
			.variant("tone", [
				"danger",
			]) // Should merge with existing tone values
			.variant("theme", [
				"light",
				"dark",
			]) // Should add new variant
			.variants({
				size: [
					"sm",
					"md",
				], // Should merge with existing size values
				round: [
					"none",
					"full",
				], // Should add new variant
			})
			.build();

		expect(result.variant).toEqual({
			tone: [
				"primary",
				"secondary",
				"danger",
			],
			size: [
				"xs",
				"sm",
				"md",
			],
			theme: [
				"light",
				"dark",
			],
			round: [
				"none",
				"full",
			],
		});
	});
});
