import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-03-complex/multi-variant-undefined-interplay-across-levels", () => {
	it("keeps create-provided values when user passes undefined across two variants", () => {
		const base = definition(
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
						"r",
					],
				},
				label: {
					class: [
						"l",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"r-md",
					],
				},
			})
			.match("tone", "dark", {
				label: {
					class: [
						"l-dark",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const child = definition(contract(base.contract).build())
			.root({
				root: {
					class: [
						"c",
					],
				},
				label: {
					class: [
						"cl",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const created = child.create({
			variant: {
				size: "md",
				tone: "dark",
			},
		});
		expect(created.slots.root()).toBe("r r-md c");
		expect(created.slots.label()).toBe("l l-dark cl");

		const u = child.create(
			tweaks([
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
			]),
		);
		expect(u.slots.root()).toBe("r r-md c");
		expect(u.slots.label()).toBe("l l-dark cl");
	});
});
