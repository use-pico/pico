/**
 * Contract Type Validation Tests
 * These tests ensure that the Contract type properly enforces the correct structure
 * All variables are prefixed with _ to satisfy Biome's unused variable rules
 */

import type { Contract, VariantRecord } from "../../src/types";

// === Valid Contract Examples ===

// ✅ Basic valid contract
type _ValidBasicContract = Contract<
	readonly [
		"root",
	],
	{
		readonly color: readonly [
			"red",
			"blue",
		];
	},
	{
		readonly group: readonly [];
		readonly value: readonly [];
	}
>;

// ✅ Complex valid contract
type _ValidComplexContract = Contract<
	readonly [
		"button",
		"icon",
		"label",
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
		readonly disabled: readonly [
			"true",
			"false",
		];
	},
	{
		readonly group: readonly [
			"button-group",
			"state-group",
		];
		readonly value: readonly [
			"size-val",
			"variant-val",
		];
	}
>;

// ✅ Contract with inheritance
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

// === Type Error Tests (commented out but demonstrate what should fail) ===

// ❌ These should cause TypeScript errors if uncommented:

// Variant as array instead of record
// type _InvalidVariantArray = Contract<
//   readonly ["root"],
//   ["color", "size"], // ❌ Error: array not assignable to VariantRecord
//   { readonly group: readonly []; readonly value: readonly []; }
// >;

// Slot as object instead of array
// type _InvalidSlotObject = Contract<
//   { root: "slot" }, // ❌ Error: object not assignable to readonly string[]
//   { readonly color: readonly ["red"]; },
//   { readonly group: readonly []; readonly value: readonly []; }
// >;

// Variant values as non-arrays
// type _InvalidVariantValues = Contract<
//   readonly ["root"],
//   { readonly color: "red" }, // ❌ Error: string not assignable to readonly string[]
//   { readonly group: readonly []; readonly value: readonly []; }
// >;

// Missing required token properties
// type _InvalidTokens = Contract<
//   readonly ["root"],
//   { readonly color: readonly ["red"]; },
//   { readonly group: readonly []; } // ❌ Error: missing 'value' property
// >;

// === Runtime Contract Validation ===

const _validContract: _ValidBasicContract = {
	slot: [
		"root",
	],
	variant: {
		color: [
			"red",
			"blue",
		],
	},
	tokens: {
		group: [],
		value: [],
	},
};

const _complexContract: _ValidComplexContract = {
	slot: [
		"button",
		"icon",
		"label",
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
		disabled: [
			"true",
			"false",
		],
	},
	tokens: {
		group: [
			"button-group",
			"state-group",
		],
		value: [
			"size-val",
			"variant-val",
		],
	},
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

// === Type-level Validation Tests ===

// Verify that VariantRecord correctly constrains variant structures
type _VariantRecordTest = VariantRecord;
const _validVariantRecord: _VariantRecordTest = {
	color: [
		"red",
		"blue",
	],
	size: [
		"sm",
		"md",
		"lg",
	],
};

// Verify that arrays are not assignable to VariantRecord
type _ArrayNotVariantRecord = [
	"color",
] extends VariantRecord
	? false
	: true;
const _arrayCheck: _ArrayNotVariantRecord = true; // Should be true (arrays are NOT variant records)

// Verify that proper objects are assignable to VariantRecord
type _ObjectIsVariantRecord = {
	color: readonly [
		"red",
	];
} extends VariantRecord
	? true
	: false;
const _objectCheck: _ObjectIsVariantRecord = true; // Should be true

// === Contract Property Type Verification ===

// Test that Contract enforces slot as readonly string array
type _SlotMustBeArray = _ValidBasicContract["slot"];
const _slotTest: _SlotMustBeArray = [
	"root",
]; // Must be array

// Test that Contract enforces variant as VariantRecord
type _VariantMustBeRecord = _ValidBasicContract["variant"];
const _variantTest: _VariantMustBeRecord = {
	color: [
		"red",
		"blue",
	],
}; // Must be record

// Test that Contract enforces tokens structure
type _TokensMustHaveStructure = _ValidBasicContract["tokens"];
const _tokensTest: _TokensMustHaveStructure = {
	group: [],
	value: [],
}; // Must have group and value arrays

export type {
	_ValidBasicContract,
	_ValidComplexContract,
	_ExtendedContract,
	_ArrayNotVariantRecord,
	_ObjectIsVariantRecord,
};
