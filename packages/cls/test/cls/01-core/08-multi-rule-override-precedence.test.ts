import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/multi-rule-override-precedence", () => {
	it("uses classes from the last matching override and subsequent matching rules", () => {
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
					// Base rule (always applies)
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
						},
					},
					// A matching non-override rule for md
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md-1",
								],
							},
						},
					},
					// The last matching override for md (clears previous)
					{
						match: {
							size: "md",
						},
						override: true,
						slot: {
							root: {
								class: [
									"OVR",
								],
							},
						},
					},
					// A rule after override that also matches md (should append after override)
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md-2",
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

		const { slots } = $cls.create();
		// Default (sm): only the base rule applies
		expect(slots.root()).toBe("base");
		// For md: last override clears previous matches, and subsequent matching rules append
		expect(
			slots.root({
				variant: {
					size: "md",
				},
			}),
		).toBe("OVR md-2");
	});
});
