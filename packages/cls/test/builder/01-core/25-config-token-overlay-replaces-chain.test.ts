import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder/config-token-overlay-replaces-chain", () => {
	it("config overlay on token replaces the referenced chain", () => {
		const $cls = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.token({
				t2: {
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
						"base",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = $cls.create(
			tweak(undefined, [
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
		expect(created.slots.root()).toBe("CONF1 base");
	});
});
