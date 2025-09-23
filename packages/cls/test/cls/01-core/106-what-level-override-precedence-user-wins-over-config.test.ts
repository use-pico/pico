import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-precedence-user-wins-over-config", () => {
	it("What-level override precedence: user override wins over config override", () => {
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
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create(undefined, {
			slot: {
				root: {
					class: [
						"config-override",
					],
					override: true,
				},
			},
		});

		// User What-level override should win over config What-level override
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"user-override",
						],
						override: true,
					},
				},
			}),
		).toBe("user-override");
	});
});
