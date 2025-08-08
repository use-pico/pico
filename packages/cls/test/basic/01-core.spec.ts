import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("core cls API", () => {
	it("creates a basic cls instance with minimal configuration", () => {
		const Basic = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = Basic.create();
		expect(slots.root()).toBe("block");
	});

	it("creates cls instance with multiple slots", () => {
		const MultiSlot = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"flex",
							],
						},
						label: {
							class: [
								"text-sm",
							],
						},
						icon: {
							class: [
								"w-4",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = MultiSlot.create();
		expect(slots.root()).toBe("flex");
		expect(slots.label()).toBe("text-sm");
		expect(slots.icon()).toBe("w-4");
	});

	it("creates cls instance with basic variants", () => {
		const WithVariants = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
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
									"text-lg",
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

		const slots = WithVariants.create();
		expect(slots.root()).toBe("block text-base");
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("block text-sm");
		expect(
			slots.root({
				size: "lg",
			}),
		).toBe("block text-lg");
	});

	it("creates cls instance with basic tokens", () => {
		const WithTokens = cls(
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
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
								"color.bg.default",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = WithTokens.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");
	});

	it("creates cls instance with boolean variants", () => {
		const WithBoolVariants = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					disabled: [
						"bool",
					],
					loading: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
					rule(
						{
							disabled: true,
						},
						{
							root: {
								class: [
									"opacity-50",
								],
							},
						},
					),
					rule(
						{
							loading: true,
						},
						{
							root: {
								class: [
									"animate-pulse",
								],
							},
						},
					),
				],
				defaults: {
					disabled: false,
					loading: false,
				},
			},
		);

		const slots = WithBoolVariants.create();
		expect(slots.root()).toBe("block");
		expect(
			slots.root({
				disabled: true,
			}),
		).toBe("block opacity-50");
		expect(
			slots.root({
				loading: true,
			}),
		).toBe("block animate-pulse");
		expect(
			slots.root({
				disabled: true,
				loading: true,
			}),
		).toBe("block opacity-50 animate-pulse");
	});
});
