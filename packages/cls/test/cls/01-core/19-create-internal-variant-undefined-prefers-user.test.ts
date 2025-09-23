import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/create-internal-variant-undefined-prefers-user", () => {
	it("uses user variant when internal variant is undefined", () => {
		const $cls = cls(
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

		const { slots } = $cls.create(
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
				variant: {
					size: undefined,
				},
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		// user provides size: "md"; internal provides undefined -> user wins
		// order: base then md then config then user (config slot applies before user)
		expect(slots.root()).toBe("base md user");
	});
});
