import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/user-slot-order-with-multiple-appends", () => {
	it("keeps order base → variant → config → user1 → user2 for multiple local calls", () => {
		const $cls = cls(
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

		const { slots } = $cls.create(
			tweaks([
				undefined,
				{
					slot: {
						root: {
							class: [
								"config",
							],
						},
					},
					variant: {
						size: "md",
					},
				},
			]),
		);

		const first = slots.root({
			slot: {
				root: {
					class: [
						"user1",
					],
				},
			},
		});
		expect(first).toBe("base md config user1");

		const second = slots.root({
			slot: {
				root: {
					class: [
						"user2",
					],
				},
			},
		});
		expect(second).toBe("base md config user2");
	});
});
