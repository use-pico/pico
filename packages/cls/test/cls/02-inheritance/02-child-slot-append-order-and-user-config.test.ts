import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-slot-append-order-and-user-config", () => {
	it("child adds classes; config then user appends order preserved", () => {
		const baseButtonCls = cls(
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

		const childButtonCls = baseButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = childButtonCls.create(undefined, {
			slot: {
				root: {
					class: [
						"config",
					],
				},
			},
		});

		expect(slots.root()).toBe("base child config");
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
		).toBe("base child config user");
	});
});
