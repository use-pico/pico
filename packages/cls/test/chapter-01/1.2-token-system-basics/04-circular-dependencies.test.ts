import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Circular Dependencies", () => {
	it("should throw error for direct circular dependency", () => {
		const Component = cls(
			{
				tokens: [
					"token.a",
					"token.b",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"token.a": {
						token: [
							"token.b",
						],
					},
					"token.b": {
						token: [
							"token.a",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"token.a",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(() => {
			slots.root();
		}).toThrow(
			"Circular dependency detected in token references: token.a -> token.b -> token.a",
		);
	});
});
