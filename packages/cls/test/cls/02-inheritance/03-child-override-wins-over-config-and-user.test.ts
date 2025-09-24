import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-override-wins-over-config-and-user", () => {
	it("child rule with override clears base and beats config/user appends", () => {
		const baseButtonCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
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
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
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
						match: {
							size: "md",
						},
						override: true,
						slot: {
							root: {
								class: [
									"CHILD-OVERRIDE",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = childButtonCls.create(
			{
				variant: {
					size: "md",
				},
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
						class: [
							"config",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("CHILD-OVERRIDE user config");
	});
});
