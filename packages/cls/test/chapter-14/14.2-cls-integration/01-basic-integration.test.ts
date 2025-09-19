import { describe, expect, it } from "vitest";
import { cls, contract, type Variant } from "../../../src";

describe("14.2 CLS Integration - Basic Integration", () => {
	it("should create a working CLS instance from builder contract", () => {
		// Build contract using the fluent API
		const result = contract()
			.tokens([
				"color.bg.primary",
				"color.text.primary",
			])
			.slots([
				"root",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();

		const _variants: Variant.Optional<typeof result> = {
			size: "md",
		};

		// Create CLS instance with the built contract
		const Button = cls(result, ({ what, def }) => ({
			token: def.token({
				"color.bg.primary": what.css([
					"bg-blue-500",
				]),
				"color.text.primary": what.css([
					"text-white",
				]),
			}),
			rules: [
				def.root({
					root: what.token([
						"color.bg.primary",
						"color.text.primary",
					]),
				}),
				def.rule(
					what.variant({
						size: "sm",
					}),
					{
						root: what.css([
							"px-2",
							"py-1",
						]),
					},
				),
			],
			defaults: def.defaults({
				size: "md",
				tone: "light",
			}),
		}));

		// Test basic functionality
		const instance = Button.create();
		expect(instance.root()).toBe("bg-blue-500 text-white");
		expect(instance.label).toBeDefined();

		// Test variant functionality
		const smallInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(smallInstance.root()).toBe("bg-blue-500 text-white px-2 py-1");

		// Verify contract reference
		expect(Button.contract).toBe(result);
	});
});
