import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.6 Bool Helper - Bool Inheritance", () => {
	it("should handle bool variants properly in inheritance scenarios", () => {
		// Create parent contract with bool variants
		const BaseCls = contract()
			.slots([
				"root",
			])
			.bool("disabled")
			.bool("focused")
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.def()
			.root({
				root: {
					class: [
						"base-component",
					],
				},
			})
			.rule(
				{
					disabled: true,
				},
				{
					root: {
						class: [
							"opacity-50",
						],
					},
				},
			)
			.rule(
				{
					focused: true,
				},
				{
					root: {
						class: [
							"ring-2",
							"ring-blue-500",
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
							"text-lg",
						],
					},
				},
			)
			.defaults({
				disabled: false,
				focused: false,
				size: "md",
			})
			.cls();

		// Create child contract inheriting bool variants
		const InputCls = contract(BaseCls.contract)
			.bool("required")
			.bool("readonly")
			.variant("type", [
				"text",
				"email",
				"password",
			])
			.def()
			.rule(
				{
					required: true,
				},
				{
					root: {
						class: [
							"border-red-300",
						],
					},
				},
			)
			.rule(
				{
					readonly: true,
				},
				{
					root: {
						class: [
							"bg-gray-100",
							"cursor-not-allowed",
						],
					},
				},
			)
			.rule(
				{
					type: "password",
				},
				{
					root: {
						class: [
							"font-mono",
						],
					},
				},
			)
			.defaults({
				disabled: false, // Inherited
				focused: false, // Inherited
				size: "md", // Inherited
				required: false, // New
				readonly: false, // New
				type: "text", // New
			})
			.cls();

		// Test parent functionality
		const baseSlots = BaseCls.create();
		expect(baseSlots.root()).toBe("base-component");

		const baseFocused = BaseCls.create(({ what }) => ({
			variant: what.variant({
				focused: true,
				size: "lg",
			}),
		}));
		expect(baseFocused.root()).toBe(
			"base-component ring-2 ring-blue-500 text-lg",
		);

		// Test child inheriting parent bool variants
		const inputSlots = InputCls.create();
		expect(inputSlots.root()).toBe("base-component");

		// Test inherited bool variants
		const inputDisabled = InputCls.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
				focused: true,
			}),
		}));
		expect(inputDisabled.root()).toBe(
			"base-component opacity-50 ring-2 ring-blue-500",
		);

		// Test new bool variants
		const inputRequired = InputCls.create(({ what }) => ({
			variant: what.variant({
				required: true,
				readonly: true,
			}),
		}));
		expect(inputRequired.root()).toBe(
			"base-component border-red-300 bg-gray-100 cursor-not-allowed",
		);

		// Test complex combination of inherited and new variants
		const inputComplex = InputCls.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
				focused: false,
				size: "lg",
				required: true,
				readonly: false,
				type: "password",
			}),
		}));
		expect(inputComplex.root()).toBe(
			"base-component opacity-50 text-lg border-red-300 font-mono",
		);

		// Verify contract structures
		expect(BaseCls.contract.variant).toEqual({
			disabled: [
				"bool",
			],
			focused: [
				"bool",
			],
			size: [
				"sm",
				"md",
				"lg",
			],
		});

		expect(InputCls.contract.variant).toEqual({
			required: [
				"bool",
			],
			readonly: [
				"bool",
			],
			type: [
				"text",
				"email",
				"password",
			],
		});

		// Verify inheritance chain
		expect(InputCls.contract["~use"]).toBe(BaseCls.contract);
	});
});
