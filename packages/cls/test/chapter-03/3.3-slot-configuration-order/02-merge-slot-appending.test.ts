import { describe, expect, it } from "vitest";
import { cls, merge } from "../../../src";

describe("3.3 Slot Configuration Order - Merge Function Should Append Slots", () => {
	it("should demonstrate that merge.ts overrides slots instead of appending them", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"component-base",
						]),
					}),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		// Simulate the Icon component scenario:
		// - User provides cls prop with slot configuration
		// - Component provides internal slot configuration
		const userConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"user-slot-class",
				]),
			}),
		});

		const internalConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"internal-slot-class",
				]),
			}),
		});

		// Use merge function like useCls does
		const mergedConfig = merge(userConfig, internalConfig);
		const config = mergedConfig();

		// Create component with merged config
		const instance = Component.create(undefined, () => config);

		// Test the result
		const result = instance.root();

		// EXPECTATION: We want both classes to be present
		// ACTUAL: Only user-slot-class is present (internal-slot-class is overridden)
		expect(result).toBe(
			"component-base internal-slot-class user-slot-class",
		);
	});

	it("should demonstrate the new merge behavior (appending)", () => {
		const userConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"user-class",
				]),
			}),
		});

		const internalConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"internal-class",
				]),
			}),
		});

		const mergedConfig = merge(userConfig, internalConfig);
		const config = mergedConfig();

		// New behavior: both classes are combined
		expect(config.slot?.root).toEqual({
			class: [
				"internal-class",
				"user-class",
			],
		});

		// This is the correct behavior - we have both classes combined
	});

	it("should test the Icon component scenario specifically", () => {
		const IconCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"icon-base",
							"text-gray-600",
						]),
					}),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		// Simulate Icon component usage:
		// 1. User provides cls prop
		const userConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"user-custom-icon",
				]),
			}),
		});

		// 2. Component provides internal config (icon string)
		const internalConfig = ({ what }: any) => ({
			slot: what.slot({
				root: what.css([
					"icon-[mdi-light--star]",
				]),
			}),
		});

		// 3. Merge them (this is what useCls does)
		const mergedConfig = merge(userConfig, internalConfig);
		const config = mergedConfig();

		// 4. Create component
		const instance = IconCls.create(undefined, () => config);

		// 5. Test result
		const result = instance.root();

		// EXPECTATION: Should have base + internal + user classes
		// ACTUAL: Only base + user classes (internal is lost)
		expect(result).toBe(
			"icon-base text-gray-600 icon-[mdi-light--star] user-custom-icon",
		);
	});
});
