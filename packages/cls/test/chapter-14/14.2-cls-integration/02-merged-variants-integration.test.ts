import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";

describe("14.2 CLS Integration - Merged Variants Integration", () => {
	it("should work with merged variants from multiple builder calls", () => {
		// Build contract with merged variants
		const result = contract()
			.token("theme.primary")
			.slot("wrapper")
			.variant("tone", [
				"primary",
				"secondary",
			])
			.variant("tone", [
				"danger",
				"success",
			]) // Should merge with existing tone values
			.variant("size", [
				"sm",
			])
			.variant("size", [
				"md",
				"lg",
			]) // Should merge with existing size values
			.build();

		// Verify the merged structure
		expect(result.variant.tone).toEqual([
			"primary",
			"secondary",
			"danger",
			"success",
		]);
		expect(result.variant.size).toEqual([
			"sm",
			"md",
			"lg",
		]);

		// Create CLS instance with merged variants
		const Component = cls(result, ({ what, def }) => ({
			token: def.token({
				"theme.primary": what.css([
					"bg-blue-600",
				]),
			}),
			rules: [
				def.root({
					wrapper: what.token([
						"theme.primary",
					]),
				}),
				def.rule(
					what.variant({
						tone: "danger",
					}),
					{
						wrapper: what.css([
							"bg-red-500",
						]),
					},
				),
				def.rule(
					what.variant({
						tone: "success",
					}),
					{
						wrapper: what.css([
							"bg-green-500",
						]),
					},
				),
				def.rule(
					what.variant({
						size: "lg",
					}),
					{
						wrapper: what.css([
							"text-lg",
						]),
					},
				),
			],
			defaults: def.defaults({
				tone: "primary",
				size: "md",
			}),
		}));

		// Test default instance
		const defaultInstance = Component.create();
		expect(defaultInstance.wrapper()).toContain("bg-blue-600");

		// Test merged variant values work
		const dangerInstance = Component.create(({ what }) => ({
			variant: what.variant({
				tone: "danger", // This should work with merged values
			}),
		}));
		expect(dangerInstance.wrapper()).toContain("bg-red-500");

		const successInstance = Component.create(({ what }) => ({
			variant: what.variant({
				tone: "success", // This should work with merged values
			}),
		}));
		expect(successInstance.wrapper()).toContain("bg-green-500");

		const largeInstance = Component.create(({ what }) => ({
			variant: what.variant({
				size: "lg", // This should work with merged values
			}),
		}));
		expect(largeInstance.wrapper()).toContain("text-lg");
	});
});
