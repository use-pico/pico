import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.6 Bool Helper - Basic Bool Variant", () => {
	it("should create boolean variant using the bool helper method", () => {
		// Create contract with bool variant using helper method
		const ToggleCls = contract()
			.slots([
				"root",
			])
			.bool("active")
			.def()
			.root({
				root: {
					class: [
						"toggle-base",
					],
				},
			})
			.rule(
				{
					active: true,
				},
				{
					root: {
						class: [
							"bg-blue-500",
							"text-white",
						],
					},
				},
			)
			.rule(
				{
					active: false,
				},
				{
					root: {
						class: [
							"bg-gray-200",
							"text-gray-700",
						],
					},
				},
			)
			.defaults({
				active: false,
			})
			.cls();

		// Test default state (active: false)
		const defaultSlots = ToggleCls.create();
		expect(defaultSlots.root()).toBe(
			"toggle-base bg-gray-200 text-gray-700",
		);

		// Test active state (active: true)
		const activeSlots = ToggleCls.create(({ what }) => ({
			variant: what.variant({
				active: true,
			}),
		}));
		expect(activeSlots.root()).toBe("toggle-base bg-blue-500 text-white");

		// Test explicit false state
		const inactiveSlots = ToggleCls.create(({ what }) => ({
			variant: what.variant({
				active: false,
			}),
		}));
		expect(inactiveSlots.root()).toBe(
			"toggle-base bg-gray-200 text-gray-700",
		);

		// Verify contract structure
		expect(ToggleCls.contract.variant).toEqual({
			active: [
				"bool",
			],
		});
		expect(ToggleCls.contract.slot).toEqual([
			"root",
		]);
	});
});
