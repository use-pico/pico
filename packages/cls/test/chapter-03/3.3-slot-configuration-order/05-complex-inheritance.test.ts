import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Complex Inheritance", () => {
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
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"base-size-md",
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
									"extended-size-lg",
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

		const { slots: instance } = ExtendedComponent.create();

		// Test inheritance with slot configuration
		const result = instance.root({
			variant: {
				size: "lg",
			},
			slot: {
				root: {
					class: [
						"user-slot-class",
					],
				},
			},
		});

		// Should contain: base classes + extended classes + user slot classes
		// Note: base-size-md is not applied because the extended component overrides the default size
		expect(result).toBe(
			"base-component extended-component extended-size-lg user-slot-class",
		);
	});
});
