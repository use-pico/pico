import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/local-override-with-token-references-replaces-all-classes", () => {
	it("even with expanded references, local override should replace everything", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t1: {
						token: [
							"t2",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $base.create();
		expect(slots.root()).toBe("a2 a1 base");
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"OVR",
						],
						override: true,
					},
				},
			}),
		).toBe("OVR");
	});
});
