import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-03-complex/deep-token-refs-across-slots-with-dual-overlays", () => {
	it("expands deep refs and applies config root overlay + user leaf overlay across slots", () => {
		const base = definition(
			contract()
				.tokens([
					"t1",
					"t2",
					"t3",
				])
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.token({
				t3: {
					class: [
						"a3",
					],
				},
				t2: {
					token: [
						"t3",
					],
					class: [
						"a2",
					],
				},
				t1: {
					token: [
						"t2",
					],
					class: [
						"a1",
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
						"t1",
					],
					class: [
						"i",
					],
				},
				label: {
					token: [
						"t1",
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
						t2: {
							class: [
								"USER2",
							],
						},
					},
				},
				{
					token: {
						t1: {
							class: [
								"CONF1",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("CONF1 r");
		expect(created.slots.icon()).toBe("CONF1 i");
		expect(created.slots.label()).toBe("CONF1 l");
	});
});
