import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("use API", () => {
	it("assigns a compatible cls instance", () => {
		const Base = cls(
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
				variant: {
					size: [
						"sm",
						"md",
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
				rules: ({ root, rule }) => [
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
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
				},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					variant: [
						"default",
						"primary",
						"success",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [],
						primary: [],
						success: [
							"bg-green-50",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: {
								token: [
									"color.text.success",
									"color.bg.success",
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

		// Assign Extended to Base using use
		const Assigned = Base.use(Extended);

		// The assigned instance should have the extended functionality
		const slots = Assigned.create({
			variant: {
				size: "md",
			},
		});
		expect(slots.root()).toBe("block text-base");
	});

	it("assigns with multiple inheritance levels", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
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
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
					},
				},
				rules: ({ root, rule }) => [
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
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Level1 = Base.extend(
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
				variant: {
					size: [
						"sm",
						"md",
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
						default: [],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ rule }) => [
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

		const Level2 = Level1.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
				},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					variant: [
						"default",
						"primary",
						"success",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [],
						primary: [],
						success: [
							"bg-green-50",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: {
								token: [
									"color.text.success",
									"color.bg.success",
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

		// Assign Level2 to Base
		const Assigned = Base.use(Level2);

		// Test all variant combinations
		const defaultSlots = Assigned.create();
		expect(defaultSlots.root()).toBe("block text-base");

		const smallSlots = Assigned.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallSlots.root()).toBe("block text-sm");

		const largeSlots = Assigned.create({
			variant: {
				size: "md",
			},
		});
		expect(largeSlots.root()).toBe("block text-base");
	});

	it("assigns with slot inheritance", () => {
		const Base = cls(
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
								"base-root",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {},
				slot: [
					"root",
					"child",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"extended-root",
							],
						},
						child: {
							class: [
								"child-slot",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const Assigned = Base.use(Extended);

		const slots = Assigned.create();
		expect(slots.root()).toBe("base-root extended-root");
	});

	it("assigns with token inheritance", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
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
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
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

		const Extended = Base.extend(
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
				variant: {
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
				rules: ({ rule }) => [
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
					variant: "default",
				},
			},
		);

		const Assigned = Base.use(Extended);

		const slots = Assigned.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");

		const primarySlots = Assigned.create({
			variant: {
				variant: "primary",
			},
		});
		expect(primarySlots.root()).toBe("block text-blue-600 bg-blue-50");
	});

	it("assigns with boolean variants", () => {
		const Base = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					disabled: [
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
								"base",
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
				],
				defaults: {
					disabled: false,
				},
			},
		);

		const Extended = Base.extend(
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
				rules: ({ rule }) => [
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

		const Assigned = Base.use(Extended);

		const slots = Assigned.create();
		expect(slots.root()).toBe("base");

		const disabledSlots = Assigned.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots.root()).toBe("base opacity-50");

		const disabledSlots2 = Assigned.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots2.root()).toBe("base opacity-50");
	});

	it("assigns with complex inheritance chain", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
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
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
					},
				},
				rules: ({ root, rule }) => [
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
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Level1 = Base.extend(
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
				rules: ({ rule }) => [
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
							label: {
								class: [
									"font-medium",
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

		const Level2 = Level1.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					variant: [
						"default",
						"primary",
						"success",
					],
					loading: [
						"bool",
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
							"text-blue-600",
						],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						success: [
							"bg-green-50",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: {
								token: [
									"color.text.success",
									"color.bg.success",
								],
							},
							icon: {
								class: [
									"text-green-500",
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
							label: {
								class: [
									"opacity-50",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
					loading: false,
				},
			},
		);

		const Assigned = Base.use(Level2);

		// Test complex combinations
		const smallSlots = Assigned.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallSlots.root()).toBe("block text-gray-900 bg-white text-sm");

		const defaultSlots = Assigned.create({
			variant: {
				size: "md",
			},
		});
		expect(defaultSlots.root()).toBe(
			"block text-gray-900 bg-white text-base",
		);
	});
});
