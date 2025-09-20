import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("mixed defined and undefined variants", () => {
	it("should handle mixed defined and undefined values", () => {
		const componentCls = cls(
			{
				tokens: [
					"base",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"red",
						"blue",
					],
					size: [
						"small",
						"large",
					],
					disabled: [
						"true",
						"false",
					],
				},
			},
			{
				defaults: {
					color: "blue",
					size: "small",
					disabled: "false",
				},
				token: {
					base: {
						class: [
							"base-styles",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"base",
								],
							},
						},
					},
					{
						match: {
							color: "red",
						},
						slot: {
							root: {
								class: [
									"text-red-500",
								],
							},
						},
					},
					{
						match: {
							color: "blue",
						},
						slot: {
							root: {
								class: [
									"text-blue-500",
								],
							},
						},
					},
					{
						match: {
							size: "large",
						},
						slot: {
							root: {
								class: [
									"text-lg",
								],
							},
						},
					},
					{
						match: {
							disabled: "true",
						},
						slot: {
							root: {
								class: [
									"opacity-50",
								],
							},
						},
					},
				],
			},
		);

		const { slots } = componentCls.create({
			variant: {
				color: undefined, // Should be filtered out, use default "blue"
				size: "large", // Should override default
				disabled: undefined, // Should be filtered out, use default "false"
			},
		});

		// Should use default color "blue" and size "large", default disabled "false"
		expect(slots.root()).toBe("base-styles text-blue-500 text-lg");
	});
});
