import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays complex", () => {
	it("handles deeply nested arrays in complex multi-level scenarios", () => {
		const BaseButtonCls = contract()
			.tokens([
				"primary",
				"secondary",
			])
			.slots([
				"root",
				"label",
			])
			.variants({
				size: [
					"sm",
					"md",
				],
			})
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
			})
			.root({
				root: {
					class: [
						"base-button",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		const ExtendedButtonCls = contract(BaseButtonCls.contract)
			.slots([
				"icon",
			])
			.variants({
				variant: [
					"primary",
					"secondary",
				],
			})
			.bool("disabled")
			.def()
			.match("variant", "primary", {
				root: {
					token: [
						"primary",
					],
					class: [
						"primary",
					],
				},
				icon: {
					class: [
						"primary-icon",
					],
				},
			})
			.match("variant", "secondary", {
				root: {
					token: [
						"secondary",
					],
					class: [
						"secondary",
					],
				},
				icon: {
					class: [
						"secondary-icon",
					],
				},
			})
			.match("disabled", true, {
				root: {
					class: [
						"disabled",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
				disabled: false,
			})
			.cls();

		const FinalButtonCls = contract(ExtendedButtonCls.contract)
			.slots([
				"badge",
			])
			.variants({
				state: [
					"loading",
					"success",
					"error",
				],
			})
			.def()
			.match("state", "loading", {
				root: {
					class: [
						"loading",
					],
				},
				badge: {
					class: [
						"loading-badge",
					],
				},
			})
			.match("state", "success", {
				root: {
					class: [
						"success",
					],
				},
				badge: {
					class: [
						"success-badge",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
				disabled: false,
				state: "success",
			})
			.cls();

		// Test with deeply nested arrays in complex inheritance
		const result = FinalButtonCls.create([
			// First level array
			[
				// Second level array
				[
					{
						variant: {
							size: "sm",
							variant: "secondary",
							disabled: true,
						},
						slot: {
							root: {
								class: [
									"nested-override",
								],
							},
						},
					},
					{
						variant: {
							state: "loading",
						},
						slot: {
							icon: {
								class: [
									"nested-icon",
								],
							},
						},
					},
				],
				// Mixed with single tweak
				{
					slot: {
						label: {
							class: [
								"nested-label",
							],
						},
					},
				},
			],
			// Triple nested array
			[
				[
					[
						{
							slot: {
								badge: {
									class: [
										"triple-nested-badge",
									],
								},
							},
						},
					],
				],
			],
		]);

		// Should combine all levels: base + inherited + nested tweaks
		expect(result.variant.size).toBe("sm");
		expect(result.variant.variant).toBe("secondary");
		expect(result.variant.disabled).toBe(true);
		expect(result.variant.state).toBe("loading");

		// Root should have: base + size + variant + token + disabled + loading + nested
		expect(result.slots.root()).toBe(
			"base-button sm secondary-token secondary disabled loading nested-override",
		);
		expect(result.slots.label()).toBe("nested-label");
		expect(result.slots.icon()).toBe("secondary-icon nested-icon");
		expect(result.slots.badge()).toBe("loading-badge triple-nested-badge");
	});
});
