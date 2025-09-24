import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/fluent-three-level-chain-builds-and-matches", () => {
	it("fluent three-level chain composes and matches variants across levels", () => {
		const baseButton = definition(
			contract()
				.tokens([
					"primary",
				])
				.slots([
					"root",
					"label",
				])
				.variant("size", [
					"sm",
					"md",
				])
				.build(),
		)
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
				label: {
					class: [
						"label-base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"base-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childButton = definition(
			contract(baseButton.contract)
				.tokens([
					"secondary",
				])
				.build(),
		)
			.token({
				secondary: {
					token: [
						"primary",
					],
					class: [
						"secondary-styles",
					],
				},
			})
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const grandchildButton = definition(
			contract(childButton.contract).build(),
		)
			.root({
				root: {
					class: [
						"grandchild",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = grandchildButton.create({
			variant: {
				size: "md",
			},
		});
		expect(created.slots.root()).toBe(
			"primary-styles base base-md child grandchild",
		);
		expect(created.slots.label()).toBe("label-base");
	});
});
