import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/create-variant-undefined-prefers-config", () => {
	it("uses internal config variant when user variant is undefined", () => {
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
			tweak([
				{
					variant: {
						size: undefined,
					},
					slot: {
						root: {
							class: [
								"user",
							],
						},
					},
				},
				{
					variant: {
						size: "md",
					},
					slot: {
						root: {
							class: [
								"config",
							],
						},
					},
				},
			]),
		);

		// internal (config) provides size: "md"; user provides undefined -> config wins
		// order: base then md then config then user
		expect(slots.root()).toBe("base md user");
	});
});
