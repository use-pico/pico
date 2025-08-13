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
			({ what, def }) => ({
				token: def.token({
					"token.a": what.token([
						"token.b",
					]),
					"token.b": what.token([
						"token.a",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"token.a",
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
			"Circular dependency detected in token references: token.a -> token.b -> token.a",
		);
	});
});
