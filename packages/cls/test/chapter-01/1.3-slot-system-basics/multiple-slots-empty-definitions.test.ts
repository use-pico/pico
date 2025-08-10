import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Empty Definitions", () => {
	it("should handle empty slot definitions gracefully", () => {
		const Component = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"root-class",
						]),
						label: what.css([]), // Empty array
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("root-class");
		expect(instance.label()).toBe(""); // Empty string for empty array
	});
});
