import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-switch-multiple-boolean", () => {
	it("multiple tokens.switch calls create independent boolean rules", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
				"secondary",
				"accent",
			])
			.slots([
				"root",
			])
			.bool("disabled")
			.bool("loading")
			.def()
			.token({
				primary: {
					class: [
						"primary-token",
					],
				},
				secondary: {
					class: [
						"secondary-token",
					],
				},
				accent: {
					class: [
						"accent-token",
					],
				},
			})
			.tokens.switch(
				"disabled",
				{
					primary: {
						class: [
							"primary-disabled",
						],
					},
				},
				{
					primary: {
						class: [
							"primary-enabled",
						],
					},
				},
			)
			.tokens.switch(
				"loading",
				{
					secondary: {
						class: [
							"secondary-loading",
						],
					},
				},
				{
					secondary: {
						class: [
							"secondary-ready",
						],
					},
				},
			)
			.root({
				root: {
					token: [
						"primary",
						"secondary",
						"accent",
					],
					class: [
						"base",
					],
				},
			})
			.defaults({
				disabled: false,
				loading: false,
			})
			.cls();

		const { slots } = buttonCls.create();

		// Default case - both false
		expect(slots.root()).toBe(
			"primary-enabled secondary-ready accent-token base",
		);

		// Only disabled=true
		expect(
			buttonCls
				.create({
					variant: {
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-disabled secondary-ready accent-token base");

		// Only loading=true
		expect(
			buttonCls
				.create({
					variant: {
						loading: true,
					},
				})
				.slots.root(),
		).toBe("primary-enabled secondary-loading accent-token base");

		// Both disabled=true and loading=true
		expect(
			buttonCls
				.create({
					variant: {
						disabled: true,
						loading: true,
					},
				})
				.slots.root(),
		).toBe("primary-disabled secondary-loading accent-token base");
	});
});
