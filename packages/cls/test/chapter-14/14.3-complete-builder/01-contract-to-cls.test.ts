import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";

describe("14.3 Complete Builder - Contract to CLS", () => {
	it("should demonstrate contract builder working perfectly with cls()", () => {
		// Build contract using fluent API
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

		// Create CLS instance using the built contract
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
				def.rule(
					what.variant({
						size: "lg",
					}),
					{
						root: what.css([
							"px-6",
							"py-3",
						]),
					},
				),
			],
			defaults: def.defaults({
				size: "md",
				tone: "light",
			}),
		}));

		// Test the created CLS instance
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

		const largeInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(largeInstance.root()).toBe("bg-blue-500 text-white px-6 py-3");

		// Verify the CLS instance has proper structure
		expect(Button).toBeDefined();
		expect(Button.contract).toBeDefined();
		expect(Button.create).toBeDefined();
		expect(Button.extend).toBeDefined();
	});
});
