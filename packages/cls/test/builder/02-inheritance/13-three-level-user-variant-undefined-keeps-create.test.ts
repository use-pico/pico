import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/three-level-user-variant-undefined-keeps-create", () => {
	it("user undefined keeps create-provided variant across three levels", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.build();
		const baseButton = definition(baseContract)
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"base-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(baseButton.contract).build();
		const childButton = definition(childContract)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const grandchildContract = contract(childButton.contract).build();
		const grandchildButton = definition(grandchildContract)
			.root({
				root: {
					class: [
						"grand",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = grandchildButton.create({
			variant: {
				size: "md",
			},
		});
		expect(created.slots.root()).toBe("base base-md child grandchild");

		const userUndefined = grandchildButton.create(
			{
				variant: {
					size: undefined,
				},
			},
			{
				variant: {
					size: "md",
				},
			},
		);
		expect(userUndefined.slots.root()).toBe(
			"base base-md child grandchild",
		);
	});
});
