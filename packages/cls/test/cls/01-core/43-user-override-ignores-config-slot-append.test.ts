import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-override-ignores-config-slot-append", () => {
	it("user override replaces result even if config adds slot classes", () => {
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
							"USER-OVERRIDE",
						],
						override: true,
					},
				},
			}),
		).toBe("USER-OVERRIDE");
	});
});
