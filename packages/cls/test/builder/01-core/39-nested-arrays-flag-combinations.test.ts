import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays flag combinations", () => {
	it("handles deeply nested arrays with various flag combinations", () => {
		const buttonCls = contract()
			.slots([
				"root",
				"label",
				"icon",
			])
			.variants({
				size: [
					"sm",
					"md",
					"lg",
				],
				variant: [
					"primary",
					"secondary",
				],
			})
			.def()
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
			.match("size", "lg", {
				root: {
					class: [
						"lg",
					],
				},
			})
			.match("variant", "primary", {
				root: {
					class: [
						"primary",
					],
				},
			})
			.match("variant", "secondary", {
				root: {
					class: [
						"secondary",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
			})
			.cls();

		// Test 1: clear: true -> non-flagged tweak -> override: true
		const result1 = buttonCls.create([
			// Initial setup
			[
				{
					variant: {
						size: "sm",
						variant: "secondary",
					},
					slot: {
						root: {
							class: [
								"initial",
							],
						},
						label: {
							class: [
								"label-initial",
							],
						},
					},
				},
			],
			// Clear flag in deeply nested array
			[
				[
					[
						[
							{
								clear: true,
								slot: {
									icon: {
										class: [
											"after-clear",
										],
									},
								},
							},
						],
					],
				],
			],
			// Non-flagged tweak in deeply nested array
			[
				[
					[
						[
							{
								slot: {
									root: {
										class: [
											"non-flagged",
										],
									},
									label: {
										class: [
											"label-non-flagged",
										],
									},
								},
							},
						],
					],
				],
			],
			// Override in deeply nested array
			[
				[
					[
						[
							{
								override: true,
								slot: {
									root: {
										class: [
											"override-final",
										],
									},
								},
							},
						],
					],
				],
			],
		]);

		// Clear should reset variants, non-flagged should merge, override should win
		expect(result1.slots.root()).toBe(
			"base-button md primary override-final",
		);
		expect(result1.slots.label()).toBe("label-non-flagged");
		expect(result1.slots.icon()).toBe("after-clear");
		expect(result1.variant.size).toBe("md");
		expect(result1.variant.variant).toBe("primary");

		// Test 2: non-flagged tweak -> clear: true -> override: true
		const result2 = buttonCls.create([
			// Initial setup
			[
				{
					variant: {
						size: "lg",
						variant: "secondary",
					},
					slot: {
						root: {
							class: [
								"initial",
							],
						},
					},
				},
			],
			// Non-flagged tweak in deeply nested array
			[
				[
					[
						[
							{
								slot: {
									root: {
										class: [
											"non-flagged",
										],
									},
									label: {
										class: [
											"label-non-flagged",
										],
									},
								},
							},
						],
					],
				],
			],
			// Clear flag in deeply nested array
			[
				[
					[
						[
							{
								clear: true,
								slot: {
									icon: {
										class: [
											"after-clear",
										],
									},
								},
							},
						],
					],
				],
			],
			// Override in deeply nested array
			[
				[
					[
						[
							{
								override: true,
								slot: {
									root: {
										class: [
											"override-final",
										],
									},
								},
							},
						],
					],
				],
			],
		]);

		// Non-flagged should merge, clear should reset, override should win
		expect(result2.slots.root()).toBe(
			"base-button md primary override-final",
		);
		expect(result2.slots.label()).toBe("");
		expect(result2.slots.icon()).toBe("after-clear");
		expect(result2.variant.size).toBe("md");
		expect(result2.variant.variant).toBe("primary");

		// Test 3: override: true -> non-flagged tweak -> clear: true
		const result3 = buttonCls.create([
			// Initial setup
			[
				{
					variant: {
						size: "sm",
						variant: "primary",
					},
					slot: {
						root: {
							class: [
								"initial",
							],
						},
					},
				},
			],
			// Override in deeply nested array
			[
				[
					[
						[
							{
								override: true,
								slot: {
									root: {
										class: [
											"override-first",
										],
									},
								},
							},
						],
					],
				],
			],
			// Non-flagged tweak in deeply nested array
			[
				[
					[
						[
							{
								slot: {
									root: {
										class: [
											"non-flagged",
										],
									},
									label: {
										class: [
											"label-non-flagged",
										],
									},
								},
							},
						],
					],
				],
			],
			// Clear flag in deeply nested array
			[
				[
					[
						[
							{
								clear: true,
								slot: {
									icon: {
										class: [
											"after-clear",
										],
									},
								},
							},
						],
					],
				],
			],
		]);

		// Override should win initially, non-flagged should merge, clear should reset
		expect(result3.slots.root()).toBe("base-button md primary");
		expect(result3.slots.label()).toBe("");
		expect(result3.slots.icon()).toBe("after-clear");
		expect(result3.variant.size).toBe("md");
		expect(result3.variant.variant).toBe("primary");
	});
});
