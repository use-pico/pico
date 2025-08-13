import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots", () => {
	it("should handle multiple slots", () => {
		const Component = cls(
			{
				tokens: [],
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
							"bg-gray-100",
							"p-4",
						]),
						label: what.css([
							"text-sm",
							"font-medium",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100 p-4");
		expect(instance.label()).toBe("text-sm font-medium");
	});
});
