import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("Inheritance Partial Override", () => {
	it("should allow partial slot overrides through inheritance", () => {
		// Create a base CardCls using contract
		const CardCls = contract()
			.slots([
				"root",
				"header",
				"content",
				"footer",
			])
			.variant("variant", [
				"default",
				"outlined",
				"elevated",
			])
			.def()
			.root({
				root: {
					class: [
						"card",
						"bg-white",
						"border",
					],
				},
				header: {
					class: [
						"card-header",
						"p-4",
						"font-semibold",
					],
				},
				content: {
					class: [
						"card-content",
						"p-4",
					],
				},
				footer: {
					class: [
						"card-footer",
						"p-4",
						"text-sm",
					],
				},
			})
			.defaults({
				variant: "default",
			})
			.cls();

		// Create a custom extension that only overrides specific slots
		const CustomCardCls = contract(CardCls.contract)
			.def()
			.root(
				{
					root: {
						class: [
							"custom-card",
							"bg-blue-50",
							"border-blue-200",
							"rounded-xl",
						],
					},
					// Only override header, leave others unchanged
					header: {
						class: [
							"custom-header",
							"p-6",
							"font-bold",
							"text-blue-900",
						],
					},
				},
				true,
			)
			.defaults({
				variant: "default",
			})
			.cls();

		// Test inheritance pattern
		const result = CardCls.use(CustomCardCls).create({
			variant: {
				variant: "outlined",
			},
		});

		// Overridden slots should use custom classes
		expect(result.slots.root()).toBe(
			"custom-card bg-blue-50 border-blue-200 rounded-xl",
		);
		expect(result.slots.header()).toBe(
			"custom-header p-6 font-bold text-blue-900",
		);

		// Non-overridden slots should keep base classes
		expect(result.slots.content()).toBe("card-content p-4");
		expect(result.slots.footer()).toBe("card-footer p-4 text-sm");
	});
});
