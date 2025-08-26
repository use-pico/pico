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
			({ what, def }) => ({
				defaults: def.defaults({
					color: "blue",
					size: "small",
					disabled: "false",
				}),
				token: def.token({
					base: what.css([
						"base-styles",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"base",
						]),
					}),
					{
						match: {
							color: "red",
						},
						slot: {
							root: what.css([
								"text-red-500",
							]),
						},
					},
					{
						match: {
							color: "blue",
						},
						slot: {
							root: what.css([
								"text-blue-500",
							]),
						},
					},
					{
						match: {
							size: "large",
						},
						slot: {
							root: what.css([
								"text-lg",
							]),
						},
					},
					{
						match: {
							disabled: "true",
						},
						slot: {
							root: what.css([
								"opacity-50",
							]),
						},
					},
				],
			}),
		);

		const slots = componentCls.create(({ what }) => ({
			variant: what.variant({
				color: undefined, // Should be filtered out, use default "blue"
				size: "large", // Should override default
				disabled: undefined, // Should be filtered out, use default "false"
			}),
		}));

		// Should use default color "blue" and size "large", default disabled "false"
		expect(slots.root()).toBe("base-styles text-blue-500 text-lg");
	});
});
