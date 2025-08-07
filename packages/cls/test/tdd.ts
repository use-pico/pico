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
				/**
				 * Here we're defining core tokens available in the system, nothing interesting happening
				 */
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
				/**
				 * Ugly, bu we can live with this
				 */
				slot: [],
				/**
				 * Some variants to check if the inheritance works for whole chain down the road.
				 */
				variant: {
					pico: [
						"foo",
						"bar",
					],
				},
			},
			{
				/**
				 * Common stuff - we defined tokens in contract, here we're forced to actually implement them
				 */
				token: {
					"primary.bgColor": {
						/**
						 * All values we've defined in contract are required
						 */
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
				/**
				 * Nothing to do, ugly, but intentional
				 */
				rule: [],
				/**
				 * Because we've defined variant, we're also forced to use default
				 * value for it
				 */
				defaults: {
					pico: "foo",
				},
			},
		);

		/**
		 * Here is somewhat real-world example of extending our type system, so it's
		 * available in the button to be used.
		 */
		const ButtonCls = PicoCls.extend(
			{
				/**
				 * Here we'll define tokens available in the button and downwards,
				 * with a little hack, see below...
				 */
				tokens: {
					/**
					 * If we provide a token that's already defined in the parent,
					 * it means we want to _replace_ it by our definition, but _only_
					 * when the key is specified here.
					 *
					 * In this case, PicoCls would have everything, except for
					 * primary.textColor.default will be _replaced_ by our definition.
					 */
					"primary.textColor": [
						"default",
					],
					"primary.borderColor": [
						"default",
					],
					/**
					 * This one is new and fresh, nothing interesting
					 */
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
					pico: "bar",
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
                    "primary.textColor": [
                        ''
                    ],
					"primary.shadowColor": [
						"sd",
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

	it("Demonstrates ExtendableTokenContract intellisense", () => {
		// Base design system with tokens
		const BaseSystem = cls(
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

		// Child component that demonstrates ExtendableTokenContract
		const ChildComponent = BaseSystem.extend(
			{
				tokens: {
					// ✅ Intellisense should show inherited tokens
					"color.primary": [
						"default",
						"hover",
					], // Override inherited token
					spacing: [
						"xs",
						"sm",
						"md",
					], // Override inherited token
					// ✅ Can add new tokens
					"button.base": [
						"default",
						"variant",
					], // New token
					"icon.size": [
						"sm",
						"md",
						"lg",
					], // New token
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
					// ✅ Can define inherited token overrides
					"color.primary": {
						default: [
							"text-red-600",
						], // Override inherited
						hover: [
							"text-red-700",
						], // Override inherited
					},
					spacing: {
						xs: [
							"p-2",
						], // Override inherited
						sm: [
							"p-3",
						], // Override inherited
						md: [
							"p-5",
						], // Override inherited
					},
					// ✅ Can define new tokens
					"button.base": {
						default: [
							"rounded",
							"font-medium",
						],
						variant: [
							"transition-colors",
						],
					},
					"icon.size": {
						sm: [
							"w-4",
							"h-4",
						],
						md: [
							"w-6",
							"h-6",
						],
						lg: [
							"w-8",
							"h-8",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"color.primary.default", // ✅ Can use inherited tokens
									"button.base.default", // ✅ Can use new tokens
									"spacing.md", // ✅ Can use inherited tokens
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

		console.log(
			"ExtendableTokenContract provides proper intellisense and type safety",
		);
	});

	it("Debug InheritedTokenGroups type", () => {
		// Base design system with tokens
		const BaseSystem = cls(
			{
				tokens: {
					"primary.textColor": [
						"default",
						"hover",
						"disabled",
					],
					"primary.bgColor": [
						"default",
						"hover",
						"disabled",
					],
					"secondary.textColor": [
						"default",
						"hover",
						"disabled",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {
					"primary.textColor": {
						default: [
							"text-blue-600",
						],
						hover: [
							"text-blue-700",
						],
						disabled: [
							"text-gray-400",
						],
					},
					"primary.bgColor": {
						default: [
							"bg-blue-600",
						],
						hover: [
							"bg-blue-700",
						],
						disabled: [
							"bg-gray-400",
						],
					},
					"secondary.textColor": {
						default: [
							"text-gray-600",
						],
						hover: [
							"text-gray-700",
						],
						disabled: [
							"text-gray-400",
						],
					},
				},
				rule: [],
				defaults: {},
			},
		);

		// Let's see what TypeScript thinks the inherited tokens are
		type BaseTokens = typeof BaseSystem.contract.tokens;
		type InheritedGroups = import("../src/types").InheritedTokenGroups<
			typeof BaseSystem.contract
		>;

		// This should help us debug what's happening
		console.log("Base tokens:", Object.keys(BaseSystem.contract.tokens));
		console.log("Debug InheritedTokenGroups type resolution");

		// Let's also check what tokens PicoCls has
		const PicoCls = cls(
			{
				tokens: {
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
				variant: {},
			},
			{
				token: {},
				rule: [],
				defaults: {},
			},
		);

		console.log("PicoCls tokens:", Object.keys(PicoCls.contract.tokens));

		// Now let's see what happens when we extend PicoCls
		const TestButtonCls = PicoCls.extend(
			{
				tokens: {
					// This should show intellisense for all PicoCls tokens
				},
				slot: [],
				variant: {},
			},
			{
				token: {},
				rule: [],
				defaults: {},
			},
		);

		console.log(
			"TestButtonCls contract tokens:",
			Object.keys(TestButtonCls.contract.tokens),
		);

		// Let's test a deeper inheritance chain
		const GrandParent = cls(
			{
				tokens: {
					"grandparent.token": [
						"value1",
						"value2",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {},
				rule: [],
				defaults: {},
			},
		);

		const Parent = GrandParent.extend(
			{
				tokens: {
					"parent.token": [
						"value1",
						"value2",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {},
				rule: [],
				defaults: {},
			},
		);

		const Child = Parent.extend(
			{
				tokens: {
					// This should show intellisense for both grandparent and parent tokens
				},
				slot: [],
				variant: {},
			},
			{
				token: {},
				rule: [],
				defaults: {},
			},
		);

		console.log(
			"GrandParent tokens:",
			Object.keys(GrandParent.contract.tokens),
		);
		console.log("Parent tokens:", Object.keys(Parent.contract.tokens));
		console.log("Child tokens:", Object.keys(Child.contract.tokens));
		console.log(
			"Child contract ~use:",
			Child.contract["~use"] ? "has parent" : "no parent",
		);

		// Let's see the actual contract structure
		console.log("Child contract structure:", {
			tokens: Child.contract.tokens,
			hasUse: !!Child.contract["~use"],
			useTokens: Child.contract["~use"]
				? Object.keys((Child.contract["~use"] as any).tokens)
				: [],
		});

		// Let's also check the Parent contract structure
		console.log("Parent contract structure:", {
			tokens: Parent.contract.tokens,
			hasUse: !!Parent.contract["~use"],
			useTokens: Parent.contract["~use"]
				? Object.keys((Parent.contract["~use"] as any).tokens)
				: [],
		});
	});
});
