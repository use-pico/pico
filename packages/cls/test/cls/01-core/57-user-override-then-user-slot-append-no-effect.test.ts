import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-override-then-user-slot-append-no-effect", () => {
	it("slot class in local call has no effect after local override", () => {
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

		expect(
			slots.root(
				{
					slot: {
						root: {
							class: [
								"user",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"USER-OVR",
							],
							override: true,
						},
					},
				},
			),
		).toBe("USER-OVR");
	});
});
