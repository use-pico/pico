import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-create-basic", () => {
	it("applies user variant and appends user slot classes", () => {
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

		const { slots } = $cls.create({
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
		});

		expect(slots.root()).toBe("base md user");
	});
});
