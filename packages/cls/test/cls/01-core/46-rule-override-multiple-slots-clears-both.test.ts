import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/rule-override-multiple-slots-clears-both", () => {
	it("override rule clears both slots and replaces with its classes", () => {
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
						override: true,
						slot: {
							root: {
								class: [
									"ROOT-OVR",
								],
							},
							icon: {
								class: [
									"ICON-OVR",
								],
							},
						},
					},
				],
				defaults: {
					danger: "off",
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("icon-base");

		const local = $cls.create({
			variant: {
				danger: "on",
			},
		});
		expect(local.slots.root()).toBe("ROOT-OVR");
		expect(local.slots.icon()).toBe("ICON-OVR");
	});
});
