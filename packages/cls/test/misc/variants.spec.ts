import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("variants", () => {
	it("applies variant-matched rules with defaults", () => {
		const C = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
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
				rules: ({ root, rule, what: u }) => [
					root({
						root: u.css([
							"inline-flex",
							"items-center",
						]),
						label: u.css([
							"font-medium",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: u.css([
								"px-2",
								"py-1",
							]),
							label: u.css([
								"text-sm",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: u.css([
								"px-4",
								"py-2",
							]),
							label: u.css([
								"text-base",
							]),
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		expect(C.create().root()).toBe("inline-flex items-center px-4 py-2");
		expect(C.create().label()).toBe("font-medium text-base");

		// Use function-style slots API
		const slots = C.create();
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("inline-flex items-center px-2 py-1");
		expect(
			slots.label({
				variant: {
					size: "sm",
				},
			}),
		).toBe("font-medium text-sm");

		// Full CreateConfig at slot call-time
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("inline-flex items-center px-2 py-1");
	});
});
