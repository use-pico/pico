import { describe, it } from "bun:test";
import { cls } from "../src";
import type { TokenGroups } from "../src/types";

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
					"primary.shadowColor": {
						disabled: [
							"blabla",
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
					size: "md",
					disabled: false,
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

		const bla = ExtendedButtonCls.create({
			slot: {
				extra: {
					class: [
						"dfdf",
					],
					token: [
						"primary.bgColor.default",
					],
				},
			},
			override: {
				extra: {
					class: [
						"dfdf",
					],
					token: [
						"primary.bgColor.default",
					],
				},
			},
			/**
			 * We can replace whatever tokens we want, fully typesafe + inherited
			 */
			token: {
				"button.some": {
					token: [],
				},
				"primary.shadowColor": {
					disabled: [],
				},
			},
			variant: {
				disabled: true,
				pico: "bar",
			},
		});
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

	it("Demonstrates helper types", () => {
		// Example to show how the helper types work
		const ExampleContract = {
			tokens: {
				"color.primary": [
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
		} as const;

		// TokenGroups extracts just the group names
		type _Groups = TokenGroups<typeof ExampleContract>;
		// Result: "color.primary" | "spacing"

		console.log("Helper types work correctly");
	});

	it("Demonstrates type safety for inherited tokens", () => {
		// Base design system
		const BaseSystem = cls(
			{
				tokens: {
					"color.primary": [
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

		// Child component that extends the base
		const ChildComponent = BaseSystem.extend(
			{
				tokens: {
					button: [
						"base",
						"variant",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					// Inherited tokens now have proper type safety
					"color.primary": {
						default: [
							"bg-blue-500",
						], // ✅ Type-safe: "default" is valid
						hover: [
							"bg-blue-600",
						], // ✅ Type-safe: "hover" is valid
						active: [
							"bg-blue-700",
						], // ✅ Type-safe: "active" is valid
						// disabled: ["bg-gray-300"], // ❌ Type error: "disabled" not in ["default", "hover", "active"]
					},
					spacing: {
						xs: [
							"p-1",
						], // ✅ Type-safe: "xs" is valid
						md: [
							"p-4",
						], // ✅ Type-safe: "md" is valid
						// xxl: ["p-12"], // ❌ Type error: "xxl" not in ["xs", "sm", "md", "lg", "xl"]
					},

					// Current contract tokens
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
				rule: [],
				defaults: {},
			},
		);

		console.log("Type safety for inherited tokens works correctly");
	});

	it("Demonstrates create method API", () => {
		// Base design system
		const BaseSystem = cls(
			{
				tokens: {
					"color.primary": [
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
				rule: [
					{
						slot: {
							root: {
								class: [
									"base-root",
								],
								token: [
									"spacing.md",
								],
							},
							label: {
								token: [
									"color.primary.default",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					size: "md",
					disabled: false,
				},
			},
		);

		// Child component
		const ChildComponent = BaseSystem.extend(
			{
				tokens: {
					button: [
						"base",
						"variant",
					],
				},
				slot: [
					"icon",
				],
				variant: {
					disabled: [
						"bool",
					],
				},
			},
			{
				token: {
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
								token: [
									"button.base",
									"button.variant",
								],
							},
							icon: {
								class: [
									"icon-class",
								],
							},
						},
					},
				],
				defaults: {
					disabled: false,
				},
			},
		);

		// Test create method with inheritance
		const instance = ChildComponent.create({
			// Variant overrides (inherited + current)
			variant: {
				variant: "secondary", // Inherited from parent
				size: "lg", // Inherited from parent
				disabled: true, // Current contract
			},
			// Slot overrides (inherited + current)
			slot: {
				root: {
					class: [
						"override-root-class",
					],
					token: [
						"color.primary.hover",
					],
				},
				label: {
					class: [
						"override-label-class",
					], // Inherited slot
				},
				icon: {
					token: [
						"button.base",
					], // Current slot
				},
			},
		});

		console.log("Create method API works correctly with inheritance");
	});

	it("Demonstrates token override functionality", () => {
		// Base design system with tokens
		const BaseSystem = cls(
			{
				tokens: {
					"color.primary": [
						"default",
						"hover",
						"active",
					],
					spacing: [
						"xs",
						"sm",
						"md",
						"lg",
					],
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
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"color.primary.default",
									"spacing.md",
								],
							},
							label: {
								token: [
									"color.primary.default",
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

		// Test token override during create
		const instance = BaseSystem.create({
			// Override specific token definitions
			token: {
				"color.primary": {
					default: [
						"text-red-600",
					], // Override default color
					hover: [
						"text-red-700",
					], // Override hover color
				},
				spacing: {
					md: [
						"p-8",
					], // Override spacing
				},
			},
			// Override variants
			variant: {
				size: "lg",
			},
		});

		console.log("Token override functionality works correctly");
	});

	it("Demonstrates optional token variant values", () => {
		// Base design system with tokens
		const BaseSystem = cls(
			{
				tokens: {
					"color.primary": [
						"default",
						"hover",
						"active",
					],
					spacing: [
						"xs",
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
					],
				},
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
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"color.primary.default",
									"spacing.md",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
				},
			},
		);

		// Test token override with optional values
		const instance = BaseSystem.create({
			token: {
				"color.primary": {
					default: [
						"text-red-600",
					], // Only override default
					// hover and active are optional and can be omitted
				},
				spacing: {
					md: [
						"p-8",
					], // Only override md spacing
					// xs, sm, lg are optional and can be omitted
				},
			},
		});

		console.log("Optional token variant values work correctly");
	});
});
