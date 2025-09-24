import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder/contract-build-then-definition-cls", () => {
	it("builds buttonContract, feeds into definition(), then .cls() and works", () => {
		const buttonContract = contract()
			.tokens([
				"primary",
				"secondary",
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

		const buttonCls = definition(buttonContract)
			.token({
				secondary: {
					class: [
						"secondary-styles",
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
			.match("size", "sm", {
				root: {
					token: [
						"primary",
					],
					class: [
						"root-sm",
					],
				},
				icon: {
					token: [
						"secondary",
					],
					class: [
						"icon-sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					token: [
						"secondary",
					],
					class: [
						"root-md",
					],
				},
				icon: {
					token: [
						"primary",
					],
					class: [
						"icon-md",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		// defaults: size=md
		const created = buttonCls.create();
		expect(created.slots.root()).toBe("secondary-styles root-md");
		expect(created.slots.icon()).toBe(
			"secondary-styles primary-styles icon-md",
		);

		// override with size=sm
		const smallButton = buttonCls.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallButton.slots.root()).toBe(
			"secondary-styles primary-styles root-sm",
		);
		expect(smallButton.slots.icon()).toBe("secondary-styles icon-sm");
	});
});
