import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Parameter-less Contract", () => {
	it("should handle parameter-less contract scenarios", () => {
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
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root?.()).toBe("bg-gray-100");
	});
});
