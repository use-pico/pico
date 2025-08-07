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
					/**
					 * This one does not replace anything, only adds a "new" value
					 * to existing tokens.
					 */
					"primary.borderColor": [
						"new",
					],
					/**
					 * This one is new and fresh, nothing interesting
					 */
					"button.some": [
						"token",
					],
				},
				/**
				 * Slot definition is harmless, it's safe to override it.
				 */
				slot: [
					"root",
					"icon",
					"label",
				],
				/**
				 * Same for variants, it's safe to override them, worst case
				 * is a new value in existing variant.
				 */
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
						/**
						 * Important to make docs about this - "bool" is a special
						 * type for making a variant value a boolean.
						 */
						"bool",
					],
				},
			},
			{
				/**
				 * Token definition, all the stuff is contract-driven.
				 */
				token: {
					/**
					 * We've defined this one, se we're forced to implement it.
					 */
					"button.some": {
						token: [
							"button-specific-class",
						],
					},
					/**
					 * Here we've added a new value to existing token, again,
					 * we're forced to implement it.
					 *
					 * The rest is optional, but available.
					 */
					"primary.borderColor": {
						/**
						 * Here we're adding another value to existing token, but
						 * because we did not specified it in our contract (ButtonCls),
						 * this one gets added to the parent token, not replacing it.
						 */
						default: [
							"better-default",
						],
						new: [
							"border-gray-300",
						],
					},
					"primary.shadowColor": {
						disabled: [
							"blabla",
						],
					},
					/**
					 * Here is a bit of magic...
					 */
					"primary.textColor": {
						/**
						 * This is the case - we've specified this token in our contract
						 * meaning this exact value (default) gets replaced by our definition.
						 */
						default: [
							"text-white",
						],
					},
				},
				rule: [
					{
						/**
						 * Override rule means drop everything before and start here fresh
						 * with values defined in this rule. Next rule in this list may
						 * add another until another "override" is met.
						 */
						override: true,
						/**
						 * What we're matching - this should be documented as this is
						 * all available variants.
						 *
						 * All of them must be met to apply this rule.
						 */
						match: {
							disabled: true,
							pico: "foo",
						},
						/**
						 * What should happen if this rule is matched:
						 */
						slot: {
							/**
							 * We've a slot here (icon)
							 */
							icon: {
								/**
								 * Which gets appended value from tokens...
								 *
								 * ...but because we've "override" flag, it will
								 * replace the value for "icon" slot.
								 */
								token: [
									"button.some.new",
								],
							},
						},
					},
					{
						/**
						 * Here is a special case
						 */
						slot: {
							/**
							 * For this slot (icon), we'll apply the given class
							 */
							icon: {
								class: [
									"class",
								],
							},
							/**
							 * But there is no "match" - this is a special case which
							 * is used to defined default classes/tokens for slots (how)
							 */
						},
					},
					{
						/**
						 * Here is nothing interesting - we're matching and applying
						 * tokens for icon and label slot.
						 */
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
				/**
				 * We're forced all the times to specify default values.
				 *
				 * This should be documented as the intention for the user is
				 * to see all the values styles are working with.
				 *
				 * So there is no "magic" defaults from somewhere which may
				 * cause a surprise.
				 */
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
				/**
				 * Rules are basically the same - here we're freely extending
				 * "variant" of the parent with a new value
				 */
				variant: {
					size: [
						"xl",
					],
				},
			},
			{
				token: {
					/**
					 * The stuff here was already documented, behavior is the same
					 */
					"button.some": {
						token: [
							"extended-button-class",
						],
					},
					"primary.textColor": {
						dff: [
							"extended-text-color",
						],
					},
					"primary.shadowColor": {
						sd: [
							"extended-shadow-color",
						],
					},
					"secondary.shadowColor": {
						disabled: [],
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

		/**
		 * Now how "create" should work and what to do...
		 */
		const bla = ExtendedButtonCls.create({
			/**
			 * We can define additions to slots, which are appended last (after all computations done).
			 *
			 * That means regardless of "variants" being set, here "extra" slot will alway have the given
			 * classes and tokens.
			 */
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
			/**
			 * This one is used to for "hard" override of the slot, regardless of
			 * the rules, which means "extra" will alway end up only with the given
			 * classes and tokens.
			 *
			 * This may be useful in case where you're feeding a foreign component and
			 * you want to disable/override it's internal styles.
			 */
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
			 * This section is useful in case we need to patch individual token values with
			 * ones provided here.
			 *
			 * Each value will replace ones defined in this section.
			 */
			token: {
				/**
				 * In this case, button.some.token will get an empty value (original will get
				 * replaced by empty).
				 */
				"button.some": {
					token: [],
				},
				/**
				 * Here we're replacing another one...
				 */
				"primary.shadowColor": {
					/**
					 * Disabled will get (be replaced by) a new value `[overridden-disabled]`
					 */
					disabled: [
						"overridden-disabled",
					],
				},
			},
			/**
			 * A way of overriding individual variants if needed
			 */
			variant: {
				disabled: true,
				pico: "bar",
			},
		});
	});
});
