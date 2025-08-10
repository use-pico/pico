import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Function Identity", () => {
	it("should maintain slot function identity across instances", () => {
		const Button = cls(
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
							"base-class",
						]),
						label: what.css([
							"label-class",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance1 = Button.create();
		const instance2 = Button.create();

		// Slot functions should return the same result
		expect(instance1.root()).toBe(instance2.root());
		expect(instance1.label()).toBe(instance2.label());

		// Both instances should have the same classes
		// TODO Classes are note tested for an exact match
		expect(instance1.root()).toBe("base-class");
		expect(instance2.root()).toBe("base-class");
		expect(instance1.label()).toBe("label-class");
		expect(instance2.label()).toBe("label-class");
	});
});
