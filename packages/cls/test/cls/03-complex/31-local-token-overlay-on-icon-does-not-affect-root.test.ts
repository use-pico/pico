import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/local-token-overlay-on-icon-does-not-affect-root", () => {
	it("local overlay on icon leaf t2 does not change root chain", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
					"icon",
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
									"r",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								token: [
									"t1",
								],
								class: [
									"i",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("a2 a1 r");
		expect(
			slots.icon({
				token: {
					t2: {
						class: [
							"LOCAL2",
						],
					},
				},
			}),
		).toBe("LOCAL2 a1 i");
		expect(slots.root()).toBe("a2 a1 r");
	});
});
