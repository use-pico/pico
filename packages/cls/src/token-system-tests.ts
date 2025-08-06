/**
 * Token System Testing Examples
 *
 * This file contains comprehensive tests and examples for the token system with inheritance.
 * Use this file to continue development and testing of token-related functionality.
 */

import type { ClassName, Contract, Definition } from "./types";

// === COMPREHENSIVE TYPE TESTS ===

// Test 1: Core token resolution
type CoreClsContract = Contract<
	readonly [
		"root",
		"wrapper",
	],
	{
		readonly color: readonly [
			"blue",
			"red",
		];
	},
	{
		readonly group: readonly [
			"group-1",
			"group-2",
		];
		readonly value: readonly [
			"variable-1",
			"variable-2",
		];
	}
>;

type ButtonClsContract = Contract<
	readonly [
		"label",
		"icon",
	],
	{
		readonly icon: readonly [
			"small",
			"large",
		];
		readonly color: readonly [
			"purple",
		];
	},
	{
		readonly group: readonly [
			"new-one",
		];
		readonly value: readonly [
			"foo-bar",
		];
	},
	CoreClsContract
>;

type SomeButtonClsContract = Contract<
	readonly [
		"some",
		"pica",
	],
	{
		readonly foo: readonly [
			"bar",
			"baz",
		];
	},
	{
		readonly group: readonly [];
		readonly value: readonly [];
	},
	ButtonClsContract
>;

// Test 2: Token inheritance calculations
import type {
	AllTokenGroups,
	AllTokenValues,
	InheritedTokenGroups,
	OwnTokenGroups,
	OwnTokenValues,
	TokenDefinition,
	TokenEx,
} from "./types";

type CoreTokenEx = TokenEx<CoreClsContract>;
type ButtonTokenEx = TokenEx<ButtonClsContract>;
type ButtonAllTokenGroups = AllTokenGroups<ButtonClsContract>;
type ButtonInheritedTokenGroups = InheritedTokenGroups<ButtonClsContract>;
type ButtonAllTokenValues = AllTokenValues<ButtonClsContract>;
type ButtonOwnTokenValues = OwnTokenValues<ButtonClsContract>;
type ButtonOwnTokenGroups = OwnTokenGroups<ButtonClsContract>;
type ButtonTokenDefinition = TokenDefinition<ButtonClsContract>;

// Test 3: Deep inheritance chain
type SomeButtonTokenEx = TokenEx<SomeButtonClsContract>;
type _SomeButtonAllTokenGroups = AllTokenGroups<SomeButtonClsContract>;
type _SomeButtonAllTokenValues = AllTokenValues<SomeButtonClsContract>;
type _SomeButtonTokenDefinition = TokenDefinition<SomeButtonClsContract>;

// Test 4: Empty token handling
type EmptyContract = Contract<
	[
		"test",
	],
	{},
	{
		group: [];
		value: [];
	}
>;
type EmptyTokenEx = TokenEx<EmptyContract>;
type EmptyTokenDefinition = TokenDefinition<EmptyContract>;

// Test 5: Extending empty tokens
type ExtendingEmptyContract = Contract<
	[
		"test",
	],
	{},
	{
		group: [
			"new",
		];
		value: [
			"val",
		];
	},
	EmptyContract
>;
type ExtendingEmptyTokenEx = TokenEx<ExtendingEmptyContract>;
type ExtendingEmptyTokenDefinition = TokenDefinition<ExtendingEmptyContract>;

// === TYPE VALIDATION ASSERTIONS ===

// Assert 1: CoreCls should have expected tokens
type CoreTokensValid = CoreTokenEx extends {
	group: readonly [
		"group-1",
		"group-2",
	];
	value: readonly [
		"variable-1",
		"variable-2",
	];
}
	? true
	: false;

// Assert 2: ButtonCls should merge tokens correctly
type ButtonTokensValid = ButtonTokenEx extends {
	group: readonly [
		"group-1",
		"group-2",
		"new-one",
	];
	value: readonly [
		"variable-1",
		"variable-2",
		"foo-bar",
	];
}
	? true
	: false;

// Assert 3: ButtonCls groups should be calculated correctly
type ButtonGroupsValid = ButtonAllTokenGroups extends
	| "group-1"
	| "group-2"
	| "new-one"
	? true
	: false;
type ButtonOwnGroupsValid = ButtonOwnTokenGroups extends "new-one"
	? true
	: false;
type ButtonInheritedGroupsValid = ButtonInheritedTokenGroups extends
	| "group-1"
	| "group-2"
	? true
	: false;

// Assert 4: ButtonCls values should be calculated correctly
type ButtonValuesValid = ButtonAllTokenValues extends
	| "variable-1"
	| "variable-2"
	| "foo-bar"
	? true
	: false;
type ButtonOwnValuesValid = ButtonOwnTokenValues extends "foo-bar"
	? true
	: false;

// Assert 5: ButtonCls token definition should enforce correct structure
type ButtonTokenDefValid = ButtonTokenDefinition extends {
	// Own group must define all values
	"new-one": {
		"variable-1": ClassName[];
		"variable-2": ClassName[];
		"foo-bar": ClassName[];
	};
	// Inherited groups only need new values
	"group-1"?: {
		"foo-bar": ClassName[];
	};
	"group-2"?: {
		"foo-bar": ClassName[];
	};
}
	? true
	: false;

// Assert 6: Empty tokens should work correctly
type EmptyTokensValid = EmptyTokenEx extends {
	group: readonly [];
	value: readonly [];
}
	? true
	: false;
type EmptyDefValid = EmptyTokenDefinition extends {} ? true : false;

// Assert 7: Extending empty tokens should work
type ExtendingEmptyValid = ExtendingEmptyTokenEx extends {
	group: readonly [
		"new",
	];
	value: readonly [
		"val",
	];
}
	? true
	: false;

type ExtendingEmptyDefValid = ExtendingEmptyTokenDefinition extends {
	new: {
		val: ClassName[];
	};
}
	? true
	: false;

// Assert 8: SomeButtonCls (with empty tokens) should inherit correctly
type SomeButtonTokensValid = SomeButtonTokenEx extends {
	group: readonly [
		"group-1",
		"group-2",
		"new-one",
	];
	value: readonly [
		"variable-1",
		"variable-2",
		"foo-bar",
	];
}
	? true
	: false;

type SomeButtonDefValid = _SomeButtonTokenDefinition extends {} ? true : false;

// Compile-time validation - these should all be true
const _validateCoreTokens: CoreTokensValid = true;
const _validateButtonTokens: ButtonTokensValid = true;
const _validateButtonGroups: ButtonGroupsValid = true;
const _validateButtonOwnGroups: ButtonOwnGroupsValid = true;
const _validateButtonInheritedGroups: ButtonInheritedGroupsValid = true;
const _validateButtonValues: ButtonValuesValid = true;
const _validateButtonOwnValues: ButtonOwnValuesValid = true;
const _validateButtonTokenDef: ButtonTokenDefValid = true;
const _validateEmptyTokens: EmptyTokensValid = true;
const _validateEmptyDef: EmptyDefValid = true;
const _validateExtendingEmpty: ExtendingEmptyValid = true;
const _validateExtendingEmptyDef: ExtendingEmptyDefValid = true;
const _validateSomeButtonTokens: SomeButtonTokensValid = true;
const _validateSomeButtonDef: SomeButtonDefValid = true;

// === PRACTICAL VALIDATION TESTS ===

// Test practical usage to ensure the token system works as expected
const _testValidButtonDefinition: Definition<ButtonClsContract> = {
	slot: {
		root: [],
		wrapper: [],
		label: [
			"label-cls",
		],
		icon: [
			"icon-cls",
		],
	},
	variant: {
		color: {
			blue: {
				root: [],
			},
			red: {
				root: [],
			},
			purple: {
				root: [],
			},
		},
		icon: {
			small: {
				icon: [],
			},
			large: {
				icon: [],
			},
		},
	},
	tokens: {
		// Inherited groups only need new values (foo-bar)
		"group-1": {
			"foo-bar": [
				"foo-bar-cls-1",
			],
		},
		"group-2": {
			"foo-bar": [
				"foo-bar-cls-2",
			],
		},
		// Own group needs all values (inherited + own)
		"new-one": {
			"variable-1": [
				"var1-cls",
			],
			"variable-2": [
				"var2-cls",
			],
			"foo-bar": [
				"foo-bar-new-cls",
			],
		},
	},
	defaults: {
		color: "blue",
		icon: "small",
	},
};

// Test empty token contracts work correctly
const _testEmptyTokenDefinition: Definition<EmptyContract> = {
	slot: {
		test: [],
	},
	variant: {},
	tokens: {}, // Should be empty
	defaults: {},
};

// Test extending empty tokens
const _testExtendingEmptyDefinition: Definition<ExtendingEmptyContract> = {
	slot: {
		test: [],
	},
	variant: {},
	tokens: {
		new: {
			val: [
				"test-val",
			],
		},
	},
	defaults: {},
};

// === NEGATIVE TEST CASES (should fail if uncommented) ===

/*
// ❌ This should fail - missing required values in own group
const testInvalidButtonDefinition1: Definition<ButtonClsContract> = {
	slot: { root: [], wrapper: [], label: [], icon: [] },
	variant: {
		color: { blue: {}, red: {}, purple: {} },
		icon: { small: {}, large: {} }
	},
	tokens: {
		"new-one": {
			// Missing "variable-1" and "variable-2" - should error
			"foo-bar": ["foo-bar-cls"]
		}
	},
	defaults: { color: "blue", icon: "small" }
};

// ❌ This should fail - trying to define non-existent values
const testInvalidButtonDefinition2: Definition<ButtonClsContract> = {
	slot: { root: [], wrapper: [], label: [], icon: [] },
	variant: {
		color: { blue: {}, red: {}, purple: {} },
		icon: { small: {}, large: {} }
	},
	tokens: {
		"new-one": {
			"variable-1": ["var1"],
			"variable-2": ["var2"],
			"foo-bar": ["foo"],
			"non-existent": ["should-error"] // Should error
		}
	},
	defaults: { color: "blue", icon: "small" }
};

// ❌ This should fail - trying to define non-existent groups
const testInvalidButtonDefinition3: Definition<ButtonClsContract> = {
	slot: { root: [], wrapper: [], label: [], icon: [] },
	variant: {
		color: { blue: {}, red: {}, purple: {} },
		icon: { small: {}, large: {} }
	},
	tokens: {
		"new-one": {
			"variable-1": ["var1"],
			"variable-2": ["var2"],
			"foo-bar": ["foo"]
		},
		"non-existent-group": { // Should error
			"foo-bar": ["should-error"]
		}
	},
	defaults: { color: "blue", icon: "small" }
};

// ❌ This should fail - inherited group not providing required new values
const testInvalidButtonDefinition4: Definition<ButtonClsContract> = {
	slot: { root: [], wrapper: [], label: [], icon: [] },
	variant: {
		color: { blue: {}, red: {}, purple: {} },
		icon: { small: {}, large: {} }
	},
	tokens: {
		"new-one": {
			"variable-1": ["var1"],
			"variable-2": ["var2"],
			"foo-bar": ["foo"]
		},
		"group-1": {
			// Should require "foo-bar" when provided
			"variable-1": ["should-be-optional"]
			// Missing "foo-bar" - should error
		}
	},
	defaults: { color: "blue", icon: "small" }
};
*/

// === EXPORT TYPES FOR EXTERNAL TESTING ===

export type {
	CoreClsContract,
	ButtonClsContract,
	SomeButtonClsContract,
	EmptyContract,
	ExtendingEmptyContract,
	CoreTokenEx,
	ButtonTokenEx,
	ButtonTokenDefinition,
	CoreTokensValid,
	ButtonTokensValid,
	ButtonGroupsValid,
	ButtonOwnGroupsValid,
	ButtonInheritedGroupsValid,
	ButtonValuesValid,
	ButtonOwnValuesValid,
	ButtonTokenDefValid,
	EmptyTokensValid,
	EmptyDefValid,
	ExtendingEmptyValid,
	ExtendingEmptyDefValid,
	SomeButtonTokensValid,
	SomeButtonDefValid,
};

// === USAGE EXAMPLES FOR FUTURE DEVELOPMENT ===

/**
 * Example 1: Creating a new token-enabled component system
 *
 * const ThemeContract = {
 *   slot: ['root', 'content'] as const,
 *   variant: { mode: ['light', 'dark'] as const },
 *   tokens: {
 *     group: ['colors', 'spacing'] as const,
 *     value: ['primary', 'secondary', 'padding'] as const
 *   }
 * };
 */

/**
 * Example 2: Extending with additional token capabilities
 *
 * const ComponentContract = {
 *   slot: ['wrapper', 'label'] as const,
 *   variant: { size: ['sm', 'lg'] as const },
 *   tokens: {
 *     group: ['animation'] as const,
 *     value: ['duration', 'easing'] as const
 *   },
 *   use: ThemeContract
 * };
 */

/**
 * Example 3: Token definition patterns
 *
 * tokens: {
 *   // Inherited groups only need new values
 *   'colors': { 'duration': ['300ms'], 'easing': ['ease-in'] },
 *   'spacing': { 'duration': ['200ms'], 'easing': ['ease-out'] },
 *
 *   // Own groups need all values
 *   'animation': {
 *     'primary': ['#blue'],     // inherited
 *     'secondary': ['#gray'],   // inherited
 *     'padding': ['1rem'],      // inherited
 *     'duration': ['250ms'],    // own
 *     'easing': ['ease']        // own
 *   }
 * }
 */
