import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.6 Bool Helper - Bool with Other Variants", () => {
	it("should work properly when bool variants are mixed with regular variants", () => {
		// Create contract mixing bool and regular variants
		const CardCls = contract()
			.slots([
				"root",
				"content",
				"badge",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.bool("elevated")
			.bool("interactive")
			.variant("theme", [
				"light",
				"dark",
			])
			.def()
			.root({
				root: {
					class: [
						"card-base",
						"rounded",
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
					content: {
						class: [
							"text-sm",
						],
					},
				},
			)
			.rule(
				{
					size: "lg",
				},
				{
					root: {
						class: [
							"p-6",
						],
					},
					content: {
						class: [
							"text-lg",
						],
					},
				},
			)
			.rule(
				{
					elevated: true,
				},
				{
					root: {
						class: [
							"shadow-lg",
							"border-0",
						],
					},
				},
			)
			.rule(
				{
					elevated: false,
				},
				{
					root: {
						class: [
							"border",
							"shadow-none",
						],
					},
				},
			)
			.rule(
				{
					interactive: true,
				},
				{
					root: {
						class: [
							"cursor-pointer",
							"hover:shadow-xl",
						],
					},
				},
			)
			.rule(
				{
					theme: "dark",
				},
				{
					root: {
						class: [
							"bg-gray-900",
							"text-white",
						],
					},
				},
			)
			.rule(
				{
					theme: "light",
				},
				{
					root: {
						class: [
							"bg-white",
							"text-gray-900",
						],
					},
				},
			)
			.defaults({
				size: "md",
				elevated: false,
				interactive: false,
				theme: "light",
			})
			.cls();

		// Test default state
		const defaultSlots = CardCls.create();
		expect(defaultSlots.root()).toBe(
			"card-base rounded border shadow-none bg-white text-gray-900",
		);

		// Test bool variants only
		const elevatedSlots = CardCls.create(({ what }) => ({
			variant: what.variant({
				elevated: true,
				interactive: true,
			}),
		}));
		expect(elevatedSlots.root()).toBe(
			"card-base rounded shadow-lg border-0 cursor-pointer hover:shadow-xl bg-white text-gray-900",
		);

		// Test mixed bool and regular variants
		const mixedSlots = CardCls.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
				elevated: true,
				theme: "dark",
			}),
		}));
		expect(mixedSlots.root()).toBe(
			"card-base rounded p-6 shadow-lg border-0 bg-gray-900 text-white",
		);
		expect(mixedSlots.content()).toBe("text-lg");

		// Test complex combination
		const complexSlots = CardCls.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
				elevated: false,
				interactive: true,
				theme: "dark",
			}),
		}));
		expect(complexSlots.root()).toBe(
			"card-base rounded p-2 border shadow-none cursor-pointer hover:shadow-xl bg-gray-900 text-white",
		);
		expect(complexSlots.content()).toBe("text-sm");

		// Verify contract structure includes both bool and regular variants
		expect(CardCls.contract.variant).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
			elevated: [
				"bool",
			],
			interactive: [
				"bool",
			],
			theme: [
				"light",
				"dark",
			],
		});
	});
});
