import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

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
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"inline-flex",
								"items-center",
							],
						},
						label: {
							class: [
								"font-medium",
							],
						},
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								class: [
									"px-2",
									"py-1",
								],
							},
							label: {
								class: [
									"text-sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								class: [
									"px-4",
									"py-2",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		expect(C.create({}).root()).toBe("inline-flex items-center px-4 py-2");
		expect(C.create({}).label()).toBe("font-medium text-base");

		// Use function-style slots API
		const slots = C.create({});
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("inline-flex items-center px-2 py-1");
		expect(
			slots.label({
				size: "sm",
			}),
		).toBe("font-medium text-sm");
	});
});
