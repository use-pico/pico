import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("Inheritance Override Pattern", () => {
	it("should allow overriding slot classes through inheritance", () => {
		// Create a base ButtonCls using contract
		const ButtonCls = contract()
			.slots([
				"root",
				"icon",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("tone", [
				"primary",
				"secondary",
			])
			.def()
			.root({
				root: {
					class: [
						"base-button",
						"px-4",
						"py-2",
					],
				},
				icon: {
					class: [
						"base-icon",
						"w-4",
						"h-4",
					],
				},
			})
			.defaults({
				size: "md",
				tone: "primary",
			})
			.cls();

		// Create a custom extension that overrides specific slots
		const CustomButtonCls = contract(ButtonCls.contract)
			.def()
			.root(
				{
					root: {
						class: [
							"custom-button",
							"px-6",
							"py-3",
							"rounded-lg",
						],
					},
					icon: {
						class: [
							"custom-icon",
							"w-5",
							"h-5",
						],
					},
				},
				true,
			)
			.defaults({
				size: "md",
				tone: "primary",
			})
			.cls();

		// Test the base ButtonCls
		const baseResult = ButtonCls.create({
			variant: {
				size: "lg",
				tone: "secondary",
			},
		});

		expect(baseResult.slots.root()).toBe("base-button px-4 py-2");
		expect(baseResult.slots.icon()).toBe("base-icon w-4 h-4");

		// Test the custom ButtonCls
		const customResult = CustomButtonCls.create({
			variant: {
				size: "lg",
				tone: "secondary",
			},
		});

		expect(customResult.slots.root()).toBe(
			"custom-button px-6 py-3 rounded-lg",
		);
		expect(customResult.slots.icon()).toBe("custom-icon w-5 h-5");

		// Use the inheritance pattern: ButtonCls.use(CustomButtonCls)
		const inheritedResult = ButtonCls.use(CustomButtonCls).create({
			variant: {
				size: "lg",
				tone: "secondary",
			},
		});

		// The custom classes should override the base classes
		expect(inheritedResult.slots.root()).toBe(
			"custom-button px-6 py-3 rounded-lg",
		);
		expect(inheritedResult.slots.icon()).toBe("custom-icon w-5 h-5");
	});
});
