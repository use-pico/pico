import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("create() API", () => {
	const Button = cls(
		{
			tokens: {
				"color.text": [
					"default",
					"primary",
				],
				"color.bg": [
					"default",
					"primary",
				],
			},
			slot: [
				"root",
				"label",
			],
			variant: {
				size: [
					"sm",
					"md",
					"lg",
				],
				variant: [
					"default",
					"primary",
				],
			},
		},
		{
			token: {
				"color.text": {
					default: [
						"text-gray-900",
					],
					primary: [
						"text-white",
					],
				},
				"color.bg": {
					default: [
						"bg-gray-100",
					],
					primary: [
						"bg-blue-600",
					],
				},
			},
			rules: ({ root, rule }) => [
				root({
					root: {
						class: [
							"inline-flex",
							"items-center",
						],
						token: [
							"color.text.default",
							"color.bg.default",
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
				rule(
					{
						size: "lg",
					},
					{
						root: {
							class: [
								"px-6",
								"py-3",
							],
						},
						label: {
							class: [
								"text-lg",
							],
						},
					},
				),
				rule(
					{
						variant: "primary",
					},
					{
						root: {
							token: [
								"color.text.primary",
								"color.bg.primary",
							],
						},
					},
				),
			],
			defaults: {
				size: "md",
				variant: "default",
			},
		},
	);

	it("creates with default values", () => {
		const slots = Button.create();
		expect(slots.root()).toBe(
			"inline-flex items-center text-gray-900 bg-gray-100 px-4 py-2",
		);
		expect(slots.label()).toBe("font-medium text-base");
	});

	it("creates with variant overrides", () => {
		const slots = Button.create({
			variant: {
				size: "lg",
				variant: "primary",
			},
		});
		expect(slots.root()).toBe(
			"inline-flex items-center px-6 py-3 text-white bg-blue-600",
		);
		expect(slots.label()).toBe("font-medium text-lg");
	});

	it("creates with slot overrides (append)", () => {
		const slots = Button.create({
			slot: {
				root: {
					class: [
						"rounded",
					],
				},
				label: {
					class: [
						"uppercase",
					],
				},
			},
		});
		expect(slots.root()).toBe(
			"inline-flex items-center text-gray-900 bg-gray-100 px-4 py-2 rounded",
		);
		expect(slots.label()).toBe("font-medium text-base uppercase");
	});

	it("creates with slot overrides (append) and tokens", () => {
		const slots = Button.create({
			slot: {
				root: {
					class: [
						"rounded",
					],
					token: [
						"color.bg.primary",
					],
				},
			},
		});
		expect(slots.root()).toBe(
			"inline-flex items-center text-gray-900 px-4 py-2 rounded bg-blue-600",
		);
	});

	it("creates with hard overrides (replace)", () => {
		const slots = Button.create({
			override: {
				root: {
					class: [
						"block",
						"w-full",
					],
				},
				label: {
					class: [
						"text-center",
					],
				},
			},
		});
		expect(slots.root()).toBe("block w-full");
		expect(slots.label()).toBe("text-center");
	});

	it("creates with token overrides", () => {
		const slots = Button.create({
			token: {
				"color.bg": {
					primary: [
						"bg-red-600",
					],
				},
			},
		});
		// Test with primary variant to see the override
		const primarySlots = Button.create({
			variant: {
				variant: "primary",
			},
			token: {
				"color.bg": {
					primary: [
						"bg-red-600",
					],
				},
			},
		});
		expect(primarySlots.root()).toBe(
			"inline-flex items-center px-4 py-2 text-white bg-red-600",
		);
	});

	it("creates with multiple overrides combined", () => {
		const slots = Button.create({
			variant: {
				size: "sm",
				variant: "primary",
			},
			slot: {
				root: {
					class: [
						"rounded",
					],
				},
			},
			token: {
				"color.bg": {
					primary: [
						"bg-green-600",
					],
				},
			},
		});
		expect(slots.root()).toBe(
			"inline-flex items-center px-2 py-1 text-white bg-green-600 rounded",
		);
		expect(slots.label()).toBe("font-medium text-sm");
	});

	it("creates with internal config (user takes precedence)", () => {
		const slots = Button.create(
			{
				variant: {
					size: "lg",
				}, // user config
			},
			{
				variant: {
					size: "sm",
				}, // internal config
				slot: {
					root: {
						class: [
							"internal-class",
						],
					},
				},
			},
		);
		expect(slots.root()).toBe(
			"inline-flex items-center text-gray-900 bg-gray-100 px-6 py-3 internal-class",
		);
		expect(slots.label()).toBe("font-medium text-lg");
	});
});
