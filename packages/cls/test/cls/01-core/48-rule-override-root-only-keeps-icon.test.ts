import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/rule-override-root-only-keeps-icon", () => {
	it("override on root does not clear icon slot", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {
					danger: [
						"off",
						"on",
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
									"root-base",
								],
							},
							icon: {
								class: [
									"icon-base",
								],
							},
						},
					},
					{
						match: {
							danger: "on",
						},
						slot: {
							root: {
								class: [
									"ROOT-OVERRIDE",
								],
								override: true,
							},
							// icon omitted intentionally
						},
					},
				],
				defaults: {
					danger: "off",
				},
			},
		);

		const { slots } = $cls.create({
			variant: {
				danger: "on",
			},
		});

		expect(slots.root()).toBe("ROOT-OVERRIDE");
		expect(slots.icon()).toBe("icon-base");
	});
});
