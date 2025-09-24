import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-config-override-then-user-slot-append-no-effect", () => {
	it("config override at create clears; user local append has no effect", () => {
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
									"base-style",
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
									"child-style",
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
									"grandchild-style",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = grandchildButtonCls.create(
			{},
			{
				slot: {
					root: {
						class: [
							"CONFIG-OVERRIDE",
						],
						override: true,
					},
				},
			},
		);

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
		).toBe("CONFIG-OVERRIDE user");
	});
});
