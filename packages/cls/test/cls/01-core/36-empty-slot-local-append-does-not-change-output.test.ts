import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/empty-slot-local-append-does-not-change-output", () => {
	it("empty local slot class array does not change result", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
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
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("base");
		expect(
			slots.root({
				slot: {
					root: {
						class: [],
					},
				},
			}),
		).toBe("base");
	});
});
