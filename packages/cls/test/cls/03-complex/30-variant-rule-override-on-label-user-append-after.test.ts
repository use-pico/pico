import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/variant-rule-override-on-label-user-append-after", () => {
	it("rule with override on label clears base; user append still applies after", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"label",
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
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"r-sm",
								],
							},
							label: {
								class: [
									"l-sm",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						override: true,
						slot: {
							label: {
								class: [
									"L-OVR",
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
				label: {
					class: [
						"USER-L",
					],
				},
			},
		});
		expect(slots.root()).toBe("");
		expect(slots.label()).toBe("L-OVR USER-L");
	});
});
