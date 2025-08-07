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
						"dff",
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
});
