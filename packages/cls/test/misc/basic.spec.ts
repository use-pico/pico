import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("basic", () => {
	it("applies base rule classes to slots in order", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
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
				],
				defaults: {},
			},
		);

		const s = Button.create();
		expect(s.root()).toBe("inline-flex items-center");
		expect(s.label()).toBe("font-medium");
	});

	it("class is applied before token within a single slot instruction", () => {
		const Button = cls(
			{
				tokens: {
					"theme.bg": [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"theme.bg": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"inline-flex",
							],
							token: [
								"theme.bg.default",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const s = Button.create();
		expect(s.root()).toBe("inline-flex bg-blue-600");
	});
});
