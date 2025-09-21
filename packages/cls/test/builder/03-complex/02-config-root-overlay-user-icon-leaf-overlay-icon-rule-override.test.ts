import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/config-root-overlay-user-icon-leaf-overlay-icon-rule-override", () => {
	it("config root overlay replaces chain; user leaf overlay applies on icon; icon rule override wins", () => {
		const base = definition(
			contract()
				.tokens([
					"t1",
					"t2",
				])
				.slots([
					"root",
					"icon",
				])
				.variant("on", [
					"bool",
				])
				.build(),
		)
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
				icon: {
					token: [
						"t1",
					],
					class: [
						"i-base",
					],
				},
			})
			.match("on", true, {
				icon: {
					class: [
						"i-on",
					],
				},
			})
			.defaults({
				on: false,
			})
			.cls();

		const created = base.create(
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
		);
		expect(created.slots.root()).toBe("CONF1 base");
		expect(created.slots.icon()).toBe("CONF1 i-base");

		expect(
			contract(base.contract)
				.def()
				.root({
					icon: {
						class: [
							"I-OVR",
						],
					},
					root: {
						class: [
							"noop",
						],
					},
				})
				.defaults({
					on: false,
				})
				.cls()
				.create()
				.slots.icon(),
		).toBe("a2 a1 i-base I-OVR");
	});
});
