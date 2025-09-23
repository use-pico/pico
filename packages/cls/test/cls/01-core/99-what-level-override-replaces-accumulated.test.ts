import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-replaces-accumulated", () => {
	it("What-level override replaces accumulated classes", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"append",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		// Test What-level override in slot configuration
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"override-class",
						],
						override: true,
					},
				},
			}),
		).toBe("override-class");
	});
});
