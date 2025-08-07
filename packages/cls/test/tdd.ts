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
				tokens: [
					// === Primary ===
					"primary.textColor.default",
					"primary.textColor.hover",
					"primary.textColor.disabled",
					"primary.borderColor.default",
					"primary.borderColor.hover",
					"primary.borderColor.disabled",
					"primary.bgColor.default",
					"primary.bgColor.hover",
					"primary.bgColor.disabled",
					"primary.shadowColor.default",
					"primary.shadowColor.hover",
					"primary.shadowColor.disabled",

					// === Secondary ===
					"secondary.textColor.default",
					"secondary.textColor.hover",
					"secondary.textColor.disabled",
					"secondary.borderColor.default",
					"secondary.borderColor.hover",
					"secondary.borderColor.disabled",
					"secondary.bgColor.default",
					"secondary.bgColor.hover",
					"secondary.bgColor.disabled",
					"secondary.shadowColor.default",
					"secondary.shadowColor.hover",
					"secondary.shadowColor.disabled",
				],
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
					"primary.bgColor.default": [],
					"primary.bgColor.disabled": [],
					"primary.bgColor.hover": [],
					"primary.borderColor.default": [],
					"primary.borderColor.disabled": [],
					"primary.borderColor.hover": [],
					"primary.textColor.disabled": [],
					"primary.textColor.hover": [],
					"primary.shadowColor.default": [],
					"primary.shadowColor.disabled": [],
					"primary.shadowColor.hover": [],
					"primary.textColor.default": [
						"text-blue-600",
					],
					//
					"secondary.bgColor.default": [],
					"secondary.bgColor.disabled": [],
					"secondary.bgColor.hover": [],
					"secondary.borderColor.default": [],
					"secondary.borderColor.disabled": [],
					"secondary.borderColor.hover": [],
					"secondary.shadowColor.default": [],
					"secondary.shadowColor.disabled": [],
					"secondary.shadowColor.hover": [],
					"secondary.textColor.disabled": [],
					"secondary.textColor.hover": [],
					"secondary.textColor.default": [
						"text-red-600",
					],
				},
				match: [],
				defaults: {
					pico: "foo",
				},
			},
		);

		const ButtonCls = PicoCls.extend(
			{
				tokens: [
					"primary.textColor.default",
					"button.some.token",
				],
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
					"button.some.token": [],
					"primary.textColor.default": [],
				},
				match: [
					{
						override: true,
						variant: {
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
						variant: {
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
						variant: {
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
				tokens: [
					"button.some.token",
					"extra.token",
				],
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
					"button.some.token": [],
					"primary.bgColor.default": [],
					"extra.token": [],
				},
				match: [
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
						variant: {
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
});
