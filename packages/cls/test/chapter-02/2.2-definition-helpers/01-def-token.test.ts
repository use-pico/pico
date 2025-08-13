import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.2 Definition Helpers - def.token", () => {
	it("should handle def.token helper for token definitions", () => {
		const Component = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-gray-100",
					]),
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.text.default": what.css([
						"text-gray-900",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100 text-gray-900");
	});
});
