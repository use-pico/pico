/**
 * Token System API Tests
 * These tests demonstrate and verify the new token system functionality
 * All variables are prefixed with _ to satisfy Biome's unused variable rules
 */

import type {
	AllTokenGroups,
	AllTokenValues,
	Cls,
	Contract,
	Props,
	TokenObject,
} from "../../src/types";

// === Test Contract with Token System ===

type _TokenContract = Contract<
	readonly [
		"root",
		"button",
		"icon",
	],
	{
		readonly theme: readonly [
			"light",
			"dark",
		];
		readonly size: readonly [
			"sm",
			"md",
			"lg",
		];
	},
	{
		readonly group: readonly [
			"primary",
			"secondary",
			"neutral",
		];
		readonly value: readonly [
			"bgColor",
			"textColor",
			"borderColor",
		];
	}
>;

// === Type-level Token System Tests ===

// Test that AllTokenGroups extracts group names correctly
type _TokenGroups = AllTokenGroups<_TokenContract>;
// Should be: "primary" | "secondary" | "neutral"

// Test that AllTokenValues extracts value names correctly
type _TokenValues = AllTokenValues<_TokenContract>;
// Should be: "bgColor" | "textColor" | "borderColor"

// Test that TokenObject creates the correct structure
type _TokenObj = TokenObject<_TokenContract>;
// Should be: { bgColor: string; textColor: string; borderColor: string; }

// === Runtime Token System Tests ===

const _tokenContract: _TokenContract = {
	slot: [
		"root",
		"button",
		"icon",
	],
	variant: {
		theme: [
			"light",
			"dark",
		],
		size: [
			"sm",
			"md",
			"lg",
		],
	},
	tokens: {
		group: [
			"primary",
			"secondary",
			"neutral",
		],
		value: [
			"bgColor",
			"textColor",
			"borderColor",
		],
	},
};

const _tokenProps: Props<_TokenContract> = {
	contract: _tokenContract,
	definition: (tokens) => {
		// Verify that tokens has the correct type and properties
		const _bgColor: string = tokens.bgColor;
		const _textColor: string = tokens.textColor;
		const _borderColor: string = tokens.borderColor;

		return {
			slot: {
				root: [
					"container",
					tokens.bgColor, // Use token in slot definition
				],
				button: [
					"btn",
					tokens.bgColor,
					tokens.textColor,
					tokens.borderColor,
				],
				icon: [
					"icon",
					tokens.textColor,
				],
			},
			variant: {
				theme: {
					light: {
						root: "bg-white text-black",
					},
					dark: {
						root: "bg-black text-white",
					},
				},
				size: {
					sm: {
						button: "px-2 py-1 text-sm",
						icon: "w-3 h-3",
					},
					md: {
						button: "px-4 py-2 text-base",
						icon: "w-4 h-4",
					},
					lg: {
						button: "px-6 py-3 text-lg",
						icon: "w-5 h-5",
					},
				},
			},
			tokens: {
				primary: {
					bgColor: [
						"bg-blue-500",
					],
					textColor: [
						"text-white",
					],
					borderColor: [
						"border-blue-600",
					],
				},
				secondary: {
					bgColor: [
						"bg-gray-500",
					],
					textColor: [
						"text-white",
					],
					borderColor: [
						"border-gray-600",
					],
				},
				neutral: {
					bgColor: [
						"bg-gray-100",
					],
					textColor: [
						"text-gray-900",
					],
					borderColor: [
						"border-gray-300",
					],
				},
			},
			defaults: {
				theme: "light",
				size: "md",
			},
		};
	},
};

// === Test Cls Interface with Token System ===

const _tokenCls: Cls<_TokenContract> = {
	create: (group) => {
		// Verify that group parameter has correct type
		const _group: AllTokenGroups<_TokenContract> = group;

		return (variantOverrides?: any, slotOverrides?: any) => ({
			slots: {
				root: () => "container bg-blue-500",
				button: () => "btn bg-blue-500 text-white border-blue-600",
				icon: () => "icon text-white",
			},
		});
	},
	use: (childProps) => ({}) as any,
	contract: _tokenContract,
};

// === Token Usage Pattern Tests ===

// Test 1: Basic token usage
const _testBasicTokenUsage = () => {
	// This demonstrates the API flow:
	// 1. Create component with token contract
	// 2. Call create() with a group
	// 3. Get component instance with resolved tokens

	const component = _tokenCls.create("primary"); // Uses primary token group
	const instance = component(); // Get component instance
	const classes = instance.slots.button(); // Get classes with resolved tokens

	return classes; // Should include primary group token classes
};

// Test 2: Different token groups
const _testDifferentGroups = () => {
	const primaryComponent = _tokenCls.create("primary");
	const secondaryComponent = _tokenCls.create("secondary");
	const neutralComponent = _tokenCls.create("neutral");

	// Each should resolve different token values
	return {
		primary: primaryComponent().slots.button(),
		secondary: secondaryComponent().slots.button(),
		neutral: neutralComponent().slots.button(),
	};
};

// Test 3: Token sharing across slots
const _testTokenSharing = () => {
	const component = _tokenCls.create("primary");
	const instance = component();

	// Same tokens (e.g., textColor) can be used across multiple slots
	return {
		button: instance.slots.button(), // Uses bgColor, textColor, borderColor
		icon: instance.slots.icon(), // Uses textColor (shared)
		root: instance.slots.root(), // Uses bgColor (shared)
	};
};

// === Type Safety Tests ===

// Test that create() only accepts valid group names
const _testGroupValidation = () => {
	const _validGroup1: AllTokenGroups<_TokenContract> = "primary";
	const _validGroup2: AllTokenGroups<_TokenContract> = "secondary";
	const _validGroup3: AllTokenGroups<_TokenContract> = "neutral";

	// These should work
	_tokenCls.create(_validGroup1);
	_tokenCls.create(_validGroup2);
	_tokenCls.create(_validGroup3);

	// This should cause a TypeScript error if uncommented:
	// _tokenCls.create("invalid"); // ❌ Error: "invalid" not in token groups
};

// Test that token object has all required properties
const _testTokenObjectValidation = () => {
	const _tokenObj: TokenObject<_TokenContract> = {
		bgColor: "bg-blue-500",
		textColor: "text-white",
		borderColor: "border-blue-600",
		// Missing any property should cause an error
	};

	// All properties should be required (no optional properties)
	return _tokenObj;
};

// === Complex Token Scenarios ===

// Test inheritance with tokens
type _BaseTokenContract = Contract<
	readonly [
		"base",
	],
	{
		readonly mode: readonly [
			"light",
			"dark",
		];
	},
	{
		readonly group: readonly [
			"theme",
		];
		readonly value: readonly [
			"backgroundColor",
		];
	}
>;

type _ExtendedTokenContract = Contract<
	readonly [
		"extended",
	],
	{
		readonly size: readonly [
			"sm",
			"lg",
		];
	},
	{
		readonly group: readonly [
			"component",
		];
		readonly value: readonly [
			"textColor",
		];
	},
	_BaseTokenContract
>;

// Should inherit token values from base contract
type _InheritedTokenValues = AllTokenValues<_ExtendedTokenContract>;
// Should be: "backgroundColor" | "textColor"

type _InheritedTokenGroups = AllTokenGroups<_ExtendedTokenContract>;
// Should be: "theme" | "component"

const _inheritedTokenObject: TokenObject<_ExtendedTokenContract> = {
	backgroundColor: "bg-white", // From base contract
	textColor: "text-black", // From extended contract
};

export type {
	_TokenContract,
	_TokenGroups,
	_TokenValues,
	_TokenObj,
	_ExtendedTokenContract,
	_InheritedTokenValues,
	_InheritedTokenGroups,
};
