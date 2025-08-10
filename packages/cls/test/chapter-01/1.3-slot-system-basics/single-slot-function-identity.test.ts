import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Slot Function Identity", () => {
	it("should handle single slot function calls correctly", () => {
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
							"test-class",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		const rootFunction = instance.root;

		// Should be a function
		expect(typeof rootFunction).toBe("function");

		// Should return classes when called
		const classes = rootFunction();
		expect(classes).toBe("test-class");
	});
});
