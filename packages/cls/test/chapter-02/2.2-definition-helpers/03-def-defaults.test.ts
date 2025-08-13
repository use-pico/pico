import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.2 Definition Helpers - def.defaults", () => {
	it("should handle def.defaults helper for default variant values", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					color: [
						"primary",
						"secondary",
					],
				},
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
				defaults: def.defaults({
					size: "md",
					color: "primary",
				}),
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100");
	});
});
