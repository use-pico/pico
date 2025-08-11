import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.4 Slot Caching Behavior - Cache Key Validation", () => {
	it("should validate cache key generation and uniqueness", () => {
		const TestComponent = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.css([
							"p-4",
						]),
					}),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.css([
								"p-2",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "md",
						}),
						{
							root: what.css([
								"p-4",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const instance = TestComponent.create();

		// Test 1: No parameters should generate the same cache key
		const noParamCall1 = instance.root();
		const noParamCall2 = instance.root();
		expect(noParamCall1).toBe(noParamCall2);

		// Test 2: Same function parameters should generate the same cache key
		const sameParams1 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		const sameParams2 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(sameParams1).toBe(sameParams2);

		// Test 3: Different function parameters should generate different cache keys
		const differentParams1 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		const differentParams2 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "md",
			}),
		}));
		expect(differentParams1).not.toBe(differentParams2);

		// Test 4: Complex function parameters should generate unique cache keys
		const complexParams1 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
			slot: {
				root: what.css([
					"custom-class-1",
				]),
			},
		}));
		const complexParams2 = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
			slot: {
				root: what.css([
					"custom-class-2",
				]),
			},
		}));
		expect(complexParams1).not.toBe(complexParams2);

		// Test 5: Verify that the cache keys are working correctly
		// The first call with each unique parameter set should compute
		// Subsequent calls with the same parameters should return cached results
		const firstComplexCall = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
			slot: {
				root: what.css([
					"unique-class",
				]),
			},
		}));

		const secondComplexCall = instance.root(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
			slot: {
				root: what.css([
					"unique-class",
				]),
			},
		}));

		expect(secondComplexCall).toBe(firstComplexCall);
	});
});
