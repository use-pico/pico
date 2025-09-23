import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-inheritance/config-root-token-overlay-replaces-chain", () => {
	it("config overlay on root token replaces the whole chain", () => {
		const baseC = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
			])
			.build();
		const base = definition(baseC)
			.token({
				t2: {
					class: [
						"b2",
					],
				},
				t1: {
					token: [
						"t2",
					],
					class: [
						"b1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"base",
					],
				},
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
			.cls();

		const created = child.create(
			tweaks([
				undefined,
				{
					token: {
						t1: {
							class: [
								"CONF",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("CONF base child");
	});
});
