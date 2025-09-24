import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-empty-slot-append-keeps-user", () => {
	it("empty config slot classes do not remove user classes", () => {
		const buttonCls = cls(
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

		const { slots } = buttonCls.create(
			{
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [],
					},
				},
			},
		);

		expect(slots.root()).toBe("base user");
	});
});
