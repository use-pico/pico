import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Minimal Contract", () => {
	describe("Absolute minimal cls usage", () => {
		it("should create cls with empty tokens, single slot, and empty variants", () => {
			const Minimal = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"minimal-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Minimal).toBeDefined();
			expect(Minimal.contract.tokens).toEqual({});
			expect(Minimal.contract.slot).toEqual([
				"root",
			]);
			expect(Minimal.contract.variant).toEqual({});
			expect(Minimal.definition.token).toEqual({});
			expect(Minimal.definition.rules).toHaveLength(1);
			expect(Minimal.definition.defaults).toEqual({});
		});

		it("should create cls with minimal token definition", () => {
			const MinimalToken = cls(
				{
					tokens: {
						base: [
							"default",
						],
					},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: def.token({
						base: {
							default: [
								"base-class",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"base.default",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(MinimalToken.contract.tokens).toEqual({
				base: [
					"default",
				],
			});
			expect(MinimalToken.definition.token).toHaveProperty("base");
			expect(MinimalToken.definition.token.base).toEqual({
				default: [
					"base-class",
				],
			});
		});

		it("should create cls with minimal variant definition", () => {
			const MinimalVariant = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {
						state: [
							"default",
						],
					},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"base-class",
							]),
						}),
					],
					defaults: def.defaults({
						state: "default",
					}),
				}),
			);

			expect(MinimalVariant.contract.variant).toEqual({
				state: [
					"default",
				],
			});
			expect(MinimalVariant.definition.defaults).toEqual({
				state: "default",
			});
		});
	});

	describe("Minimal create() usage", () => {
		it("should create slots with minimal configuration", () => {
			const Minimal = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"minimal-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			const slots = Minimal.create();
			expect(slots.root).toBeDefined();
			expect(typeof slots.root).toBe("function");
		});

		it("should return CSS classes from minimal slot", () => {
			const Minimal = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"minimal-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			const slots = Minimal.create();
			const result = slots.root();
			expect(result).toContain("minimal-class");
		});
	});

	describe("Minimal inheritance chain", () => {
		it("should maintain minimal contract through inheritance", () => {
			const Base = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"base-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			const Extended = Base.extend(
				{
					tokens: {
						color: [
							"default",
						],
					},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: def.token({
						color: {
							default: [
								"text-black",
							],
						},
					}),
					rules: [
						def.root({
							root: what.css([
								"text-black",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Extended.contract.tokens).toEqual({
				color: [
					"default",
				],
			});
			expect(Extended.contract.slot).toEqual([
				"root",
			]);
			expect(Extended.contract.variant).toEqual({});
		});
	});
});
