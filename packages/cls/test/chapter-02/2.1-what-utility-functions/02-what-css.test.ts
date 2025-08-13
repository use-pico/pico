import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - what.css", () => {
	it("should handle what.css utility for direct CSS classes", () => {
		const Component = cls(
			{
				tokens: [],
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
							"bg-gray-100",
							"p-4",
							"rounded",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100 p-4 rounded");
	});
});
