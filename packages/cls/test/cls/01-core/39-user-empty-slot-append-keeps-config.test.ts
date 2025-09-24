import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-empty-slot-append-keeps-config", () => {
	it("empty user slot classes do not remove config classes", () => {
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
						class: [],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("base config");
	});
});
