import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-override", () => {
	it("replaces accumulated classes for the 'root' slot when local override is provided", () => {
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
				override: true,
				slot: {
					root: {
						class: [
							"custom",
						],
					},
				},
			}),
		).toBe("bg-gray-100 base custom");
	});
});
