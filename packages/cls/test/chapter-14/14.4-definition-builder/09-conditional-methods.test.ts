import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Conditional Methods", () => {
	it("should only provide methods relevant to the contract capabilities", () => {
		// Test 1: Inheritance contract - should work with short chain when inheriting
		expect(() => {
			const ParentCls = contract()
				.tokens([
					"color.base",
				])
				.def()
				.token({
					"color.base": {
						class: [
							"text-gray-900",
						],
					},
				})
				.cls();

			const ChildCls = contract(ParentCls.contract).def().cls();
			expect(ChildCls).toBeDefined();
		}).not.toThrow();

		// Test 2: Contract with tokens - should require .token() call
		expect(() => {
			const TokenCls = contract()
				.tokens([
					"color.primary",
				])
				.def()
				.token({
					"color.primary": {
						class: [
							"text-blue-500",
						],
					},
				})
				.cls();
			expect(TokenCls).toBeDefined();
		}).not.toThrow();

		// Test 3: Contract with variants - should require .defaults() call
		expect(() => {
			const VariantCls = contract()
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.def()
				.defaults({
					size: "md",
				})
				.cls();
			expect(VariantCls).toBeDefined();
		}).not.toThrow();

		// Test 4: Contract with variants - should support .rule() and .root() methods
		expect(() => {
			const VariantWithRulesCls = contract()
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.slots([
					"root",
				])
				.def()
				.rule(
					{
						size: "sm",
					},
					{
						root: {
							class: [
								"p-2",
							],
						},
					},
				)
				.root({
					root: {
						class: [
							"border",
						],
					},
				})
				.defaults({
					size: "md",
				})
				.cls();
			expect(VariantWithRulesCls).toBeDefined();
		}).not.toThrow();

		// Test 5: Full contract - should support all methods
		expect(() => {
			const FullCls = contract()
				.tokens([
					"color.primary",
					"color.secondary",
				])
				.slots([
					"root",
					"content",
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
				.def()
				.token({
					"color.primary": {
						class: [
							"text-blue-500",
						],
					},
					"color.secondary": {
						class: [
							"text-gray-500",
						],
					},
				})
				.rule(
					{
						size: "sm",
					},
					{
						root: {
							class: [
								"p-2",
							],
						},
					},
				)
				.root({
					root: {
						token: [
							"color.primary",
						],
					},
				})
				.defaults({
					size: "md",
					tone: "light",
				})
				.cls();
			expect(FullCls).toBeDefined();
		}).not.toThrow();
	});
});
