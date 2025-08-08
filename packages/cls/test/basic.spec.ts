import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";
import { component } from "../src/component";
import { token } from "../src/token";

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

		const s = Button.create({});
		expect(s.root).toBe("inline-flex items-center");
		expect(s.label).toBe("font-medium");
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

		const s = Button.create({});
		expect(s.root).toBe("inline-flex bg-blue-600");
	});

	it("component() helper produces same output for static slots", () => {
		const T = component({
			slots: [
				"root",
				"label",
			],
			root: {
				root: {
					class: [
						"inline-flex",
						"items-center",
					],
				},
				label: {
					class: "font-medium",
				},
			},
			defaults: {},
		});

		const s = T.create();
		expect(s.root).toBe("inline-flex items-center");
		expect(s.label).toBe("font-medium");
	});

	it("token() helper can be extended with slots", () => {
		const T = token({
			tokens: {
				"theme.bg": [
					"default",
				],
				"theme.text": [
					"default",
				],
			},
			token: {
				"theme.bg": {
					default: [
						"bg-blue-600",
					],
				},
				"theme.text": {
					default: [
						"text-white",
					],
				},
			},
		});

		const Extended = T.extend(
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
							token: [
								"theme.bg.default",
							],
						},
						label: {
							token: [
								"theme.text.default",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const s = Extended.create();
		expect(s.root).toBe("bg-blue-600");
		expect(s.label).toBe("text-white");
	});
});
