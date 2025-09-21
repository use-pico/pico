import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/fluent-contract-stepwise-types-retained", () => {
	it("builds contract through multiple variables and retains types to cls", () => {
		const step1 = contract();
		const step2 = step1.tokens([
			"t1",
		]);
		const step3 = step2.slots([
			"root",
			"icon",
		]);
		const step4 = step3.variant("size", [
			"sm",
			"md",
		]);
		const built = step4
			.def()
			.token({
				t1: {
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
			.match("size", "sm", {
				root: {
					class: [
						"sm",
					],
				},
				icon: {
					class: [
						"i-sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
				icon: {
					class: [
						"i-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const a = built.create();
		expect(a.slots.root()).toBe("a1 base sm");
		expect(a.slots.icon()).toBe("i-sm");
		const b = built.create({
			variant: {
				size: "md",
			},
		});
		expect(b.slots.root()).toBe("a1 base md");
		expect(b.slots.icon()).toBe("i-md");
	});
});
