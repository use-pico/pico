import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-config-override-then-user-override-final-wins", () => {
	it("in 3-level chain, local user override wins over config override", () => {
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
									"child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const grandchildButtonCls = childButtonCls.extend(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = grandchildButtonCls.create(undefined, {
			slot: {
				root: {
					class: [
						"CONFIG-OVERRIDE",
					],
					override: true,
				},
			},
		});

		// local user override wins
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
