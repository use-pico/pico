import { describe, expect, it } from "vitest";
import { cls, withVariants } from "../../../src";

describe("13.1 Utility Functions - withVariants - Basic Variant Computation", () => {
	it("should compute variants with the same behavior as create method", () => {
		// Create CLS instance with embedded contract and definition
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg",
					"color.text",
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
					theme: [
						"light",
						"dark",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": what.css([
						"bg-white",
					]),
					"color.text": what.css([
						"text-black",
					]),
				}),
				rules: [
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
							size: "md",
						}),
						{
							root: what.css([
								"px-4",
								"py-2",
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
					theme: "light",
				}),
			}),
		);

		// Test the create method
		const slots = ButtonCls.create(
			() => ({
				variant: {
					size: "lg",
				},
			}),
			() => ({
				variant: {
					theme: "dark",
				},
			}),
		);

		// Test the standalone withVariants function
		const result = withVariants(
			ButtonCls,
			() => ({
				variant: {
					size: "lg",
				},
			}),
			() => ({
				variant: {
					theme: "dark",
				},
			}),
		);

		// Verify that both approaches produce the same effective variant
		expect(result).toEqual({
			size: "lg",
			theme: "dark",
		});

		// Verify that the create method still works and produces the same result
		const createResult = slots.root();
		expect(createResult).toBe("px-6 py-3");
	});
});
