import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Self Referencing Tokens", () => {
	it("should throw error for self-referencing token", () => {
		const Component = cls(
			{
				tokens: [
					"token.self",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"token.self": {
						token: [
							"token.self",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"token.self",
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
			"Circular dependency detected in token references: token.self",
		);
	});
});
