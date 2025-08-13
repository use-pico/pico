import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.2 Definition Helpers - def.root", () => {
	it("should handle def.root helper for root slot rules", () => {
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
							"rounded-lg",
							"shadow-sm",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100 p-4 rounded-lg shadow-sm");
	});
});
