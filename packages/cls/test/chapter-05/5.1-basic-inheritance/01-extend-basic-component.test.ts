import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("5.1 Basic Inheritance - Extend Basic Component", () => {
	it("should handle basic component inheritance with extend method", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
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
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.css([
								"text-sm",
								"p-2",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "md",
						}),
						{
							root: what.css([
								"text-base",
								"p-4",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-blue-100",
					]),
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.css([
								"text-lg",
								"p-6",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const instance = ExtendedComponent.create();
		expect(instance.root()).toBe("text-sm p-2 bg-blue-100");
	});
});
