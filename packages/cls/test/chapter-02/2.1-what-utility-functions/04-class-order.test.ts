import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Class Order", () => {
	it("should maintain class order with what.css", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"first-class",
							"second-class",
							"third-class",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("first-class second-class third-class");
	});
});
