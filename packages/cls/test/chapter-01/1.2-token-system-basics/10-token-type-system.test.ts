import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Type System", () => {
	it("should enforce token type safety across component hierarchy", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.text.primary",
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
					"color.text.primary": what.css([
						"text-gray-900",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.text.primary",
					"color.bg.accent",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-blue-100",
					]),
					"color.text.primary": what.css([
						"text-blue-900",
					]),
					"color.bg.accent": what.css([
						"bg-blue-500",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = ExtendedComponent.create();
		expect(instance.root()).toBe("bg-blue-100 text-blue-900");
	});
});
