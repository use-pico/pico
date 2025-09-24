import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/fluent-contract-stepwise-types-retained", () => {
	it("builds contract through multiple variables and retains types to cls", () => {
		const step1 = contract();
		const step2 = step1.tokens([
			"primary",
		]);
		const step3 = step2.slots([
			"root",
			"icon",
		]);
		const step4 = step3.variant("size", [
			"sm",
			"md",
		]);
		const buttonCls = step4
			.def()
			.token({
				primary: {
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
			.match("size", "sm", {
				root: {
					class: [
						"sm",
					],
				},
				icon: {
					class: [
						"icon-sm",
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
						"icon-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const smallButton = buttonCls.create();
		expect(smallButton.slots.root()).toBe("primary-styles base sm");
		expect(smallButton.slots.icon()).toBe("icon-sm");
		const mediumButton = buttonCls.create({
			variant: {
				size: "md",
			},
		});
		expect(mediumButton.slots.root()).toBe("primary-styles base md");
		expect(mediumButton.slots.icon()).toBe("icon-md");
	});
});
