import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Class-Only Styling", () => {
	it("should handle class-only styling with what.css", () => {
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
							"inline-flex",
							"items-center",
							"rounded-md",
							"font-medium",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe(
			"inline-flex items-center rounded-md font-medium",
		);
	});
});
