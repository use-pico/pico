import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/config-override-ignores-user-slot-append", () => {
	it("config override replaces result even if user adds slot classes", () => {
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

		const { slots } = $cls.create(
			tweak([
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
					override: {
						root: {
							class: [
								"CONF-OVR",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("CONF-OVR");
	});
});
