import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-tweak-basic", () => {
	it("applies user variant and appends user slot classes for the 'root' slot", () => {
		const buttonCls = cls(
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

		// No user tweak uses defaults (sm)
		const { slots } = buttonCls.create();
		expect(slots.root()).toBe("base");

		// With user tweak: variant triggers md rule and user slot class appends last
		expect(
			slots.root({
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
			}),
		).toBe("base md user");
	});
});
