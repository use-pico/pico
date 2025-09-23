import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-in-create-user-tweak", () => {
	it("What-level override in user tweak at create() replaces accumulated classes", () => {
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

		// Test What-level override in user tweak at create()
		const { slots } = $cls.create({
			slot: {
				root: {
					class: [
						"user-override",
					],
					override: true,
				},
			},
		});

		expect(slots.root()).toBe("user-override");
	});
});
