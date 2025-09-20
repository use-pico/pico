import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-per-slot-override-root-does-not-affect-icon", () => {
	it("override on root leaves icon from base intact", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
									"b-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								class: [
									"b-icon",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						override: true,
						slot: {
							root: {
								class: [
									"OVR",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("OVR");
		expect(slots.icon()).toBe("b-icon");
	});
});
