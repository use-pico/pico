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
			({ what, def }) => ({
				token: def.token({
					"token.self": what.token([
						"token.self",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"token.self",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(() => {
			instance.root();
		}).toThrow(
			"Circular dependency detected in token references: token.self",
		);
	});
});
