import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/rule-override-icon-only-keeps-root", () => {
	it("override on icon does not clear root slot", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {
					alert: [
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
							alert: "on",
						},
						slot: {
							icon: {
								class: [
									"ICON-OVR",
								],
								override: true,
							},
							// root omitted intentionally
						},
					},
				],
				defaults: {
					alert: "off",
				},
			},
		);

		const { slots } = $cls.create({
			variant: {
				alert: "on",
			},
		});

		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("ICON-OVR");
	});
});
