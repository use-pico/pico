import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/three-level-user-variant-undefined-keeps-create", () => {
	it("user undefined keeps create-provided variant across three levels", () => {
		const baseC = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.build();
		const base = definition(baseC)
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
						"b-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childC = contract(base.contract).build();
		const child = definition(childC)
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

		const grandC = contract(child.contract).build();
		const grand = definition(grandC)
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

		const created = grand.create({
			variant: {
				size: "md",
			},
		});
		expect(created.slots.root()).toBe("base b-md child grand");

		const userUndefined = grand.create(
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
		expect(userUndefined.slots.root()).toBe("base b-md child grand");
	});
});
