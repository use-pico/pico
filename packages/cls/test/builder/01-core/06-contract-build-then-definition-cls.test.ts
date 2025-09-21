import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder/contract-build-then-definition-cls", () => {
	it("builds $contract, feeds into definition(), then .cls() and works", () => {
		const $contract = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
				"icon",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.build();

		const $cls = definition($contract)
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
			.match("size", "sm", {
				root: {
					token: [
						"t1",
					],
					class: [
						"r-sm",
					],
				},
				icon: {
					token: [
						"t2",
					],
					class: [
						"i-sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					token: [
						"t2",
					],
					class: [
						"r-md",
					],
				},
				icon: {
					token: [
						"t1",
					],
					class: [
						"i-md",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		// defaults: size=md
		const created = $cls.create();
		expect(created.slots.root()).toBe("a2 r-md");
		expect(created.slots.icon()).toBe("a2 a1 i-md");

		// override with size=sm
		const sm = $cls.create({
			variant: {
				size: "sm",
			},
		});
		expect(sm.slots.root()).toBe("a2 a1 r-sm");
		expect(sm.slots.icon()).toBe("a2 i-sm");
	});
});
