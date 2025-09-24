import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/multi-variant-undefined-interplay-across-levels", () => {
	it("keeps create-provided values when user passes undefined across two variants", () => {
		const baseButton = definition(
			contract()
				.slots([
					"root",
					"label",
				])
				.variant("size", [
					"sm",
					"md",
				])
				.variant("tone", [
					"light",
					"dark",
				])
				.build(),
		)
			.root({
				root: {
					class: [
						"root-base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"root-md",
					],
				},
			})
			.match("tone", "dark", {
				label: {
					class: [
						"label-dark",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const childButton = definition(contract(baseButton.contract).build())
			.root({
				root: {
					class: [
						"root-child",
					],
				},
				label: {
					class: [
						"label-child",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const created = childButton.create({
			variant: {
				size: "md",
				tone: "dark",
			},
		});
		expect(created.slots.root()).toBe("root-base root-md root-child");
		expect(created.slots.label()).toBe("label-base label-dark label-child");

		const userUndefined = childButton.create(
			{
				variant: {
					size: undefined,
					tone: undefined,
				},
			},
			{
				variant: {
					size: "md",
					tone: "dark",
				},
			},
		);
		expect(userUndefined.slots.root()).toBe("root-base root-md root-child");
		expect(userUndefined.slots.label()).toBe(
			"label-base label-dark label-child",
		);
	});
});
