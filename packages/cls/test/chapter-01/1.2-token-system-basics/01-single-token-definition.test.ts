import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Single Token Definition", () => {
	it("should handle single token definitions", () => {
		const Component = cls(
			{
				tokens: [
					"color.bg.default",
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
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100");
	});
});
