import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-inheritance/child-per-slot-override-keeps-other-slots", () => {
	it("per-slot local override clears only that slot", () => {
		const baseC = contract()
			.slots([
				"root",
				"icon",
			])
			.variant("size", [
				"sm",
			])
			.build();
		const base = definition(baseC)
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i-base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"b-sm",
					],
				},
				icon: {
					class: [
						"i-sm",
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
				icon: {
					class: [
						"i-child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = child.create(
			tweaks([
				undefined,
				{
					override: {
						root: {
							class: [
								"OVR",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("OVR");
		expect(created.slots.icon()).toBe("i-base i-sm i-child");
	});
});
