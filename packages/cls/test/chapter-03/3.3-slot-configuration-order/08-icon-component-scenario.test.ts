import { describe, expect, it } from "vitest";
import { cls, merge } from "../../../src";

describe("3.3 Slot Configuration Order - Icon Component Scenario", () => {
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"icon-base",
									"text-gray-600",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		// Simulate Icon component usage:
		// 1. User provides cls prop
		const userConfig = {
			slot: {
				root: {
					class: [
						"user-custom-icon",
					],
				},
			},
		};

		// 2. Component provides internal config (icon string)
		const internalConfig = {
			slot: {
				root: {
					class: [
						"icon-[mdi-light--star]",
					],
				},
			},
		};

		// 3. Merge them (this is what useCls does)
		const mergedConfig = merge(userConfig, internalConfig);

		// 4. Create component
		const { slots: instance } = IconCls.create(undefined, mergedConfig);

		// 5. Test result
		const result = instance.root();

		// EXPECTATION: Should have base + internal + user classes
		// ACTUAL: Only base + user classes (internal is lost)
		expect(result).toBe(
			"icon-base text-gray-600 icon-[mdi-light--star] user-custom-icon",
		);
	});
});
