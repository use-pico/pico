import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/token-reference-and-user-overlay-order", () => {
	it("expands primary->secondary and user overlay on secondary applies before rule class order", () => {
		// build with a trivial bool variant to satisfy builder type requirements
		const buttonCls = contract()
			.tokens([
				"primary",
				"secondary",
			]) // re-declare for new contract
			.slots([
				"root",
			]) // single slot
			.bool("on")
			.def()
			.token({
				secondary: {
					class: [
						"secondary-styles",
						"secondary-extra",
					],
				},
				primary: {
					token: [
						"secondary",
					],
					class: [
						"primary-styles",
					],
				},
			})
			.root({
				root: {
					token: [
						"primary",
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
		const { slots } = buttonCls.create();
		expect(slots.root()).toBe(
			"secondary-styles secondary-extra primary-styles base",
		);
		expect(
			slots.root({
				token: {
					secondary: {
						class: [
							"USER-SECONDARY",
						],
					},
				},
			}),
		).toBe("USER-SECONDARY primary-styles base");
	});
});
