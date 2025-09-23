import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-override-wins-over-local", () => {
	it("uses config override as the final result even if local override is provided", () => {
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
						"CONF-OVR",
					],
					override: true,
				},
			},
		});

		// Default (sm): config override applies, but local override would win if provided
		expect(slots.root()).toBe("CONF-OVR");
		// For md: local override must win over config override
		expect(
			slots.root({
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"USER-OVR",
						],
						override: true,
					},
				},
			}),
		).toBe("USER-OVR");
	});
});
