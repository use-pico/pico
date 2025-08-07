import { describe, it } from "bun:test";
import { cls } from "../src";

describe("TDD", () => {
	it("Just Showcase", () => {
		/**
		 * Base tokens - this should be source of your design tokens provided
		 * to all further components (meaning, all component should extend from this one).
		 */
		const PicoCls = cls(
			{
				tokens: {
					// === Primary ===
					"primary.textColor": [
						"default",
						"hover",
						"disabled",
					],
					"primary.borderColor": [
						"default",
						"hover",
						"disabled",
					],
					"primary.bgColor": [
						"default",
						"hover",
						"disabled",
					],
					"primary.shadowColor": [
						"default",
						"hover",
						"disabled",
					],

					// === Secondary ===
					"secondary.textColor": [
						"default",
						"hover",
						"disabled",
					],
					"secondary.borderColor": [
						"default",
						"hover",
						"disabled",
					],
					"secondary.bgColor": [
						"default",
						"hover",
						"disabled",
					],
					"secondary.shadowColor": [
						"default",
						"hover",
						"disabled",
					],
				},
				slot: [],
				variant: {
					pico: [
						"foo",
						"bar",
					],
				},
			},
			{
				token: {
					"primary.bgColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					"primary.borderColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					"primary.textColor": {
						disabled: [],
						hover: [],
						default: [
							"text-blue-600",
						],
					},
					"primary.shadowColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					//
					"secondary.bgColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					"secondary.borderColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					"secondary.shadowColor": {
						default: [],
						disabled: [],
						hover: [],
					},
					"secondary.textColor": {
						disabled: [],
						hover: [],
						default: [
							"text-red-600",
						],
					},
				},
				rule: [],
				defaults: {
					pico: "foo",
				},
			},
		);

		const ButtonCls = PicoCls.extend(
			{
				tokens: {
					"primary.textColor": [
						"default",
					],
					"button.some": [
						"token",
					],
				},
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
					],
					size: [
						"sm",
						"md",
					],
					disabled: [
						"bool",
					],
				},
			},
			{
				token: {
					// Current contract tokens (nested structure)
                    
					"button.some": {
						token: [
							"button-specific-class",
						],
					},
					"primary.textColor": {
						default: [
							"text-white",
						],
					},
				},
				rule: [
					{
						override: true,
						match: {
							disabled: true,
							pico: "foo",
						},
						slot: {},
					},
					{
						slot: {
							icon: {
								class: [
									"class",
								],
							},
						},
					},
					{
						match: {
							pico: "bar",
						},
						slot: {
							icon: {
								token: [
									"primary.bgColor.disabled",
								],
							},
							label: {
								class: [
									"dfdf",
								],
							},
						},
					},
					{
						match: {
							variant: "primary",
						},
						slot: {
							label: {
								class: [
									"dsf",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					disabled: true,
					size: "md",
					pico: "bar",
				},
			},
		);

		const _testAssignment: typeof PicoCls = PicoCls.use(ButtonCls);

		const ExtendedButtonCls = ButtonCls.extend(
			{
				tokens: {
					"button.some": [
						"token",
					],
					extra: [
						"token",
					],
				},
				slot: [
					"extra",
				],
				variant: {
					size: [
						"xl",
					],
				},
			},
			{
				token: {
					// Current contract tokens (nested structure)
					"button.some": {
						token: [
							"extended-button-class",
						],
					},
					extra: {
						token: [
							"extra-slot-class",
						],
					},
				},
				rule: [
					{
						slot: {
							extra: {
								token: [
									"extra.token",
								],
							},
						},
					},
					{
						match: {
							size: "xl",
						},
						slot: {
							root: {
								token: [
									"primary.bgColor.default",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					disabled: false,
					pico: "foo",
					size: "sm",
				},
			},
		);

		const _testAssignment2: typeof PicoCls = PicoCls.use(ExtendedButtonCls);
	});

	it("Demonstrates inheritance correctly", () => {
		// Base design system with tokens
		const DesignSystem = cls(
			{
				tokens: {
					"color.primary": [
						"default",
						"hover",
						"active",
					],
					"color.secondary": [
						"default",
						"hover",
						"active",
					],
					spacing: [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.primary": {
						default: [
							"text-blue-600",
						],
						hover: [
							"text-blue-700",
						],
						active: [
							"text-blue-800",
						],
					},
					"color.secondary": {
						default: [
							"text-gray-600",
						],
						hover: [
							"text-gray-700",
						],
						active: [
							"text-gray-800",
						],
					},
					spacing: {
						xs: [
							"p-1",
						],
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
						xl: [
							"p-8",
						],
					},
				},
				rule: [],
				defaults: {},
			},
		);

		// Button component that extends the design system
		const Button = DesignSystem.extend(
			{
				tokens: {
					button: [
						"base",
						"variant",
					], // Only defines its own tokens
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {
					// Only define current contract tokens
					button: {
						base: [
							"rounded",
							"font-medium",
						],
						variant: [
							"transition-colors",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
								// Can use inherited tokens from parent
								token: [
									"button.base",
									"button.variant",
									"spacing.md",
								],
							},
							label: {
								// Can use inherited tokens from parent
								token: [
									"color.primary.default",
								],
							},
						},
					},
					{
						match: {
							variant: "primary",
						},
						slot: {
							root: {
								// Can use inherited tokens from parent
								token: [
									"color.primary.default",
								],
							},
							label: {
								// Can use inherited tokens from parent
								token: [
									"color.primary.default",
								],
							},
						},
					},
					{
						match: {
							variant: "secondary",
						},
						slot: {
							root: {
								// Can use inherited tokens from parent
								token: [
									"color.secondary.default",
								],
							},
							label: {
								// Can use inherited tokens from parent
								token: [
									"color.secondary.default",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					size: "md",
				},
			},
		);

		// Test that inheritance works
		const buttonInstance = Button.create({});
		console.log("Inheritance example created successfully");
	});
});
