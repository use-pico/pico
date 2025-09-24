import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-override", () => {
	it("local override replaces accumulated classes for the 'root' slot", () => {
		const $cls = cls(
			{
				tokens: [
					"bg",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					bg: {
						class: [
							"bg-gray-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"bg",
								],
								class: [
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("bg-gray-100 base");
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"custom",
						],
						override: true,
					},
				},
			}),
		).toBe("custom");
	});
});
