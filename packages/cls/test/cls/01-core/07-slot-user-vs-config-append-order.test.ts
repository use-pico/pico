import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/slot-user-vs-config-append-order", () => {
	it("appends config classes first and user classes last for the 'root' slot", () => {
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
						"config",
					],
				},
			},
		});

		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			}),
		).toBe("base config user");
	});
});
