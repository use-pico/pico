/**
 * Type-level tests for the Props interface and cls function
 * These tests verify that our refactored types work correctly with the original Props design
 * All variables are prefixed with _ to satisfy Biome's unused variable rules
 */

import type {
	Cls,
	Contract,
	Definition,
	Props,
	Slot,
	TokenSchema,
	VariantRecord,
} from "../../src/types";

// === Test Contract ===

type _TestContract = Contract<
	readonly [
		"button",
		"icon",
	],
	{
		readonly size: readonly [
			"sm",
			"md",
			"lg",
		];
		readonly variant: readonly [
			"primary",
			"secondary",
		];
	},
	{
		readonly group: readonly [
			"button-group",
		];
		readonly value: readonly [
			"button-value",
		];
	}
>;

// === Test Props Interface ===

const _testDefinition: Definition<_TestContract> = {
	slot: {
		button: "px-4 py-2 rounded font-medium",
		icon: "w-4 h-4",
	},
	variant: {
		size: {
			sm: {
				button: "text-sm px-2 py-1",
				icon: "w-3 h-3",
			},
			md: {
				button: "text-base px-4 py-2",
				icon: "w-4 h-4",
			},
			lg: {
				button: "text-lg px-6 py-3",
				icon: "w-5 h-5",
			},
		},
		variant: {
			primary: {
				button: "bg-blue-500 text-white hover:bg-blue-600",
			},
			secondary: {
				button: "bg-gray-200 text-gray-900 hover:bg-gray-300",
			},
		},
	},
	tokens: {
		"button-group": {
			"button-value": [
				"btn-base",
				"btn-interactive",
			],
		},
	},
	defaults: {
		size: "md",
		variant: "primary",
	},
	match: [
		{
			if: {
				size: "sm",
				variant: "primary",
			},
			do: {
				button: "shadow-sm",
			},
		},
	],
};

const _testContract: _TestContract = {
	slot: [
		"button",
		"icon",
	],
	variant: {
		size: [
			"sm",
			"md",
			"lg",
		],
		variant: [
			"primary",
			"secondary",
		],
	},
	tokens: {
		group: [
			"button-group",
		],
		value: [
			"button-value",
		],
	},
};

const _testProps: Props<_TestContract> = {
	contract: _testContract,
	definition: _testDefinition,
};

// === Test Cls Interface ===

// This would be the return type of cls(_testProps)
const _testCls: Cls<_TestContract> = {
	create: () => ({
		slots: {
			button: () =>
				"px-4 py-2 rounded font-medium text-base bg-blue-500 text-white",
			icon: () => "w-4 h-4",
		},
	}),
	use: <
		const TSlot extends Slot,
		const TVariant extends VariantRecord,
		const TTokens extends TokenSchema,
	>(
		_childProps: Props<Contract<TSlot, TVariant, TTokens, _TestContract>>,
	): Cls<Contract<TSlot, TVariant, TTokens, _TestContract>> => {
		return {} as any; // Implementation would go here
	},
	contract: _testContract,
};

// === Test Inheritance Chain ===

type _BaseContract = Contract<
	readonly [
		"root",
	],
	{
		readonly theme: readonly [
			"light",
			"dark",
		];
	},
	{
		readonly group: readonly [
			"base-group",
		];
		readonly value: readonly [
			"base-value",
		];
	}
>;

type _ExtendedContract = Contract<
	readonly [
		"child",
	],
	{
		readonly color: readonly [
			"blue",
			"red",
		];
	},
	{
		readonly group: readonly [
			"extended-group",
		];
		readonly value: readonly [
			"extended-value",
		];
	},
	_BaseContract
>;

const _extendedDefinition: Definition<_ExtendedContract> = {
	slot: {
		// Own slots are required
		child: "child-base",
		// Inherited slots are optional but can be provided
		root: "root-base",
	},
	variant: {
		// Own variants are required
		color: {
			blue: {
				child: "text-blue-500",
				root: "bg-blue-50",
			},
			red: {
				child: "text-red-500",
				root: "bg-red-50",
			},
		},
		// Inherited variants are optional but can be provided
		theme: {
			light: {
				root: "bg-white",
				child: "text-gray-900",
			},
			dark: {
				root: "bg-gray-900",
				child: "text-gray-100",
			},
		},
	},
	tokens: {
		// Own groups are required with all values
		"extended-group": {
			"base-value": [
				"class1",
				"class2",
			],
			"extended-value": [
				"class3",
				"class4",
			],
		},
		// Inherited groups are optional but can provide new values
		"base-group": {
			"extended-value": [
				"class5",
			],
		},
	},
	defaults: {
		// Must provide defaults for all variants (own + inherited)
		color: "blue",
		theme: "light",
	},
	match: [
		{
			if: {
				color: "blue",
				theme: "dark",
			},
			do: {
				child: "border border-blue-400",
			},
		},
	],
};

const _extendedContract: _ExtendedContract = {
	slot: [
		"child",
	],
	variant: {
		color: [
			"blue",
			"red",
		],
	},
	tokens: {
		group: [
			"extended-group",
		],
		value: [
			"extended-value",
		],
	},
	use: {
		slot: [
			"root",
		],
		variant: {
			theme: [
				"light",
				"dark",
			],
		},
		tokens: {
			group: [
				"base-group",
			],
			value: [
				"base-value",
			],
		},
	},
};

const _extendedProps: Props<_ExtendedContract> = {
	contract: _extendedContract,
	definition: _extendedDefinition,
};

// === Test Complex Inheritance ===

type _DeepContract = Contract<
	readonly [
		"deep",
	],
	{
		readonly size: readonly [
			"xs",
			"sm",
		];
	},
	{
		readonly group: readonly [
			"deep-group",
		];
		readonly value: readonly [
			"deep-value",
		];
	},
	_ExtendedContract
>;

const _deepDefinition: Definition<_DeepContract> = {
	slot: {
		deep: "deep-base",
		// All inherited slots are optional
		child: "inherited-child",
		root: "inherited-root",
	},
	variant: {
		// Own variants
		size: {
			xs: {
				deep: "text-xs",
			},
			sm: {
				deep: "text-sm",
			},
		},
		// Inherited variants (all optional)
		color: {
			blue: {
				deep: "border-blue-200",
			},
			red: {
				deep: "border-red-200",
			},
		},
		theme: {
			light: {
				deep: "bg-white",
			},
			dark: {
				deep: "bg-gray-800",
			},
		},
	},
	tokens: {
		"deep-group": {
			"base-value": [
				"deep-class1",
			],
			"extended-value": [
				"deep-class2",
			],
			"deep-value": [
				"deep-class3",
			],
		},
	},
	defaults: {
		size: "sm",
		color: "blue",
		theme: "light",
	},
};

const _deepContract: _DeepContract = {
	slot: [
		"deep",
	],
	variant: {
		size: [
			"xs",
			"sm",
		],
	},
	tokens: {
		group: [
			"deep-group",
		],
		value: [
			"deep-value",
		],
	},
	use: _extendedContract,
};

const _deepProps: Props<_DeepContract> = {
	contract: _deepContract,
	definition: _deepDefinition,
};

// === Runtime Usage Examples ===

// These demonstrate how the cls function would be used with proper typing

/*
import { cls } from "../src/cls";

// Basic usage
const buttonComponent = cls(_testProps);
const buttonInstance = buttonComponent.create();
const buttonClasses = buttonInstance.slots.button(); // Returns merged classes
const iconClasses = buttonInstance.slots.icon();

// With overrides
const customButton = buttonComponent.create({ size: "lg", variant: "secondary" });
const customButtonClasses = customButton.slots.button();

// Inheritance usage
const extendedComponent = cls(_extendedProps);
const extendedInstance = extendedComponent.create({ color: "red", theme: "dark" });

// Deep inheritance
const deepComponent = cls(_deepProps);
const deepInstance = deepComponent.create({ 
	size: "xs", 
	color: "blue", 
	theme: "dark" 
});
*/

// === Type Safety Tests ===

// These should cause TypeScript errors if uncommented:

// Wrong slot in definition
// const _wrongSlotDef: Definition<_TestContract> = {
//   slot: {
//     wrongSlot: "class", // ❌ Error: wrongSlot not in contract
//   },
//   // ... rest would be required
// };

// Wrong variant in definition
// const _wrongVariantDef: Definition<_TestContract> = {
//   slot: { button: "class", icon: "class" },
//   variant: {
//     wrongVariant: { // ❌ Error: wrongVariant not in contract
//       value: { button: "class" }
//     }
//   },
//   // ... rest required
// };

// Missing required defaults
// const _missingDefaultsDef: Definition<_TestContract> = {
//   slot: { button: "class", icon: "class" },
//   variant: { size: { md: { button: "class" } } },
//   tokens: { "button-group": { "button-value": ["class"] } },
//   defaults: {
//     // ❌ Error: missing 'variant' default
//     size: "md",
//   },
// };

export type { _TestContract, _ExtendedContract, _DeepContract };
