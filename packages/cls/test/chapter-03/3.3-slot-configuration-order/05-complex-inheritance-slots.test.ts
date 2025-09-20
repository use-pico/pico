import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Complex Inheritance Slots", () => {
	it("should handle complex inheritance with slot configurations", () => {
		const BaseComponent = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"base-component",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const ExtendedComponent = BaseComponent.extend(
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
				},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"extended-component",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"large-size",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const { slots } = ExtendedComponent.create({
			variant: {
				size: "lg",
			},
		});

		// Test inheritance with slot configurations
		const result = slots.root({
			slot: {
				root: {
					class: [
						"user-slot-class",
					],
				},
			},
		});

		expect(result).toBe(
			"base-component extended-component large-size user-slot-class",
		);
	});
});
