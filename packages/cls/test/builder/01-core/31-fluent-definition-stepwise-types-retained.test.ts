import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/fluent-definition-stepwise-types-retained", () => {
	it("builds definition stepwise in variables and retains types to cls", () => {
		const c = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
				"label",
			])
			.variant("tone", [
				"light",
				"dark",
			]);
		const d1 = c.def();
		const d2 = d1.token({
			t1: {
				class: [],
			},
			t2: {
				class: [
					"a2",
				],
			},
		});
		const d3 = d2.token({
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
		});
		const d4 = d3.root({
			root: {
				token: [
					"t1",
				],
				class: [
					"base",
				],
			},
			label: {
				class: [
					"lbl",
				],
			},
		});
		const d5 = d4.match("tone", "dark", {
			root: {
				class: [
					"dark",
				],
			},
		});
		const clsBuilt = d5
			.defaults({
				tone: "light",
			})
			.cls();

		const light = clsBuilt.create();
		expect(light.slots.root()).toBe("a2 a1 base");
		expect(light.slots.label()).toBe("lbl");

		const dark = clsBuilt.create({
			variant: {
				tone: "dark",
			},
		});
		expect(dark.slots.root()).toBe("a2 a1 base dark");
		expect(dark.slots.label()).toBe("lbl");
	});
});
