import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-override-wins-over-config", () => {
	it("local override wins over config override when both are provided", () => {
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

		const { slots } = $cls.create(undefined, {
			slot: {
				root: {
					class: [
						"CONFIG-OVERRIDE",
					],
					override: true,
				},
			},
		});

		// Default (sm): config override applies, but local override would win if provided
		expect(slots.root()).toBe("CONFIG-OVERRIDE");
		// For md: local override must win over config override
		expect(
			slots.root({
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"USER-OVERRIDE",
						],
						override: true,
					},
				},
			}),
		).toBe("USER-OVERRIDE");
	});
});
