import { PicoCls } from "./src/cls/PicoCls";

// Test case 1: No variants declared - should show type error for invalid variants
export const TestCls1 = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {}, // No variants
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([]),
			}),
			def.rule(
				what.variant({
					invalidVariant: "invalidValue", // This should cause a type error
				}),
				{
					root: what.css([]),
				},
			),
		],
		defaults: def.defaults({
			anotherInvalidVariant: "anotherInvalidValue", // This should cause a type error
		}),
	}),
);

// Test case 2: Valid variants declared - should work fine
export const TestCls2 = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			size: [
				"sm",
				"md",
				"lg",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([]),
			}),
			def.rule(
				what.variant({
					size: "lg", // This should work
					disabled: true, // This should work
				}),
				{
					root: what.css([]),
				},
			),
		],
		defaults: def.defaults({
			size: "md", // This should work
			disabled: false, // This should work
		}),
	}),
);
