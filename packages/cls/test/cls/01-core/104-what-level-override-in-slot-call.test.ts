import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-in-slot-call", () => {
	it("What-level override in slot call replaces accumulated classes", () => {
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

		// Test What-level override in slot call
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"slot-override",
						],
						override: true,
					},
				},
			}),
		).toBe("slot-override");
	});
});
