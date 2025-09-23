import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-03-complex/deep-branching-refs-per-slot-with-dual-overlays", () => {
	it("resolves per-slot branching refs and applies config root + user leaf overlays", () => {
		const base = definition(
			contract()
				.tokens([
					"t1",
					"t2",
					"t3",
					"t4",
				])
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.token({
				t4: {
					class: [
						"d4",
					],
				},
				t3: {
					token: [
						"t4",
					],
					class: [
						"d3",
					],
				},
				t2: {
					token: [
						"t3",
					],
					class: [
						"d2",
					],
				},
				t1: {
					token: [
						"t2",
					],
					class: [
						"d1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"r",
					],
				},
				icon: {
					token: [
						"t2",
					],
					class: [
						"i",
					],
				},
				label: {
					token: [
						"t3",
					],
					class: [
						"l",
					],
				},
			})
			.cls();

		const created = base.create(
			tweaks([
				{
					token: {
						t3: {
							class: [
								"U3",
							],
						},
					},
				},
				{
					token: {
						t1: {
							class: [
								"C1",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("C1 r");
		expect(created.slots.icon()).toBe("U3 d2 i");
		expect(created.slots.label()).toBe("U3 l");
	});
});
