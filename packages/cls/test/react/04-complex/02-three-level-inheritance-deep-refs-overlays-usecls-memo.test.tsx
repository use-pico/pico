import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TweakProvider, useClsMemo } from "../../../src";

describe("react/04-complex/three-level-inheritance-deep-refs-overlays-usecls-memo", () => {
	it("expands token chains across levels, applies config root overlay, user leaf overlay, and respects memo deps", () => {
		// Base with tokens a->b->c and two slots
		const Base = contract()
			.tokens([
				"a",
				"b",
				"c",
			]) // a -> b -> c
			.slots([
				"root",
				"icon",
			])
			.variant("mode", [
				"light",
				"dark",
			])
			.def()
			.token({
				c: {
					class: [
						"C",
					],
				},
				b: {
					token: [
						"c",
					],
					class: [
						"B",
					],
				},
				a: {
					token: [
						"b",
					],
					class: [
						"A",
					],
				},
			})
			.root({
				root: {
					token: [
						"a",
					],
					class: [
						"R",
					],
				},
				icon: {
					class: [
						"I",
					],
				},
			})
			.match("mode", "dark", {
				root: {
					class: [
						"D",
					],
				},
				icon: {
					class: [
						"D-i",
					],
				},
			})
			.defaults({
				mode: "light",
			})
			.cls();

		// Child adds a new token d referencing a, rule appends across slots
		const Child = Base.extend(
			{
				tokens: [
					"d",
				],
				slot: [],
				variant: {
					mode: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {
					d: {
						token: [
							"a",
						],
						class: [
							"D1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"d",
								],
								class: [
									"CR",
								],
							},
							icon: {
								class: [
									"CI",
								],
							},
						},
					},
				],
				defaults: {
					mode: "light",
				},
			},
		);

		// Grand adds overlay potential with another token e referencing d
		const Grand = Child.extend(
			{
				tokens: [
					"e",
				],
				slot: [],
				variant: {
					mode: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {
					e: {
						token: [
							"d",
						],
						class: [
							"E1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"e",
								],
								class: [
									"GR",
								],
							},
						},
					},
				],
				defaults: {
					mode: "light",
				},
			},
		);

		const wrapper = ({ children }: PropsWithChildren) => (
			<TweakProvider
				cls={Grand}
				tweak={{
					// Provider applies dark mode and appends
					variant: {
						mode: "dark",
					},
					slot: {
						root: {
							class: [
								"P",
							],
						},
						icon: {
							class: [
								"P-i",
							],
						},
					},
				}}
			>
				{children}
			</TweakProvider>
		);

		// internal: root overlay on token a (replaces A->B->C expansion), plus icon append
		const { result, rerender } = renderHook(
			({ m }: { m: "light" | "dark" }) =>
				useClsMemo(
					Grand,
					// user: leaf overlay on token c (only affects where c surfaces), user appends
					{
						token: {
							c: {
								class: [
									"U-c",
								],
							},
						},
						slot: {
							root: {
								class: [
									"U",
								],
							},
						},
						variant: {
							mode: m,
						},
					},
					{
						token: {
							a: {
								class: [
									"I-a",
								],
							},
						},
						slot: {
							icon: {
								class: [
									"I-i",
								],
							},
						},
					},
					[
						m,
					],
				),
			{
				wrapper,
				initialProps: {
					m: "dark",
				},
			},
		);

		// Expansion analysis:
		// - token a is overlaid by INTERNAL "I-a" (replaces A B C chain for a occurrences)
		// - token c is leaf-overlaid by USER "U-c" (only where c referenced directly, but a overlay hides c where a chain used)
		// - Base root: token a -> I-a (overlay), then R; Child adds token d->a and CR; Grand adds e->d and GR
		//   Effective root: I-a R + token d (I-a) + CR + token e (I-a) + GR = I-a R I-a CR I-a GR
		// - Provider (P) then USER (U) appends, variant dark adds D and D-i
		// - Icon: base I, child CI, provider P-i, internal I-i, variant D-i
		//   Order for appends: internal -> provider -> user for slots; for overrides: none here.
		expect(result.current.slots.root()).toBe("I-a R I-a CR I-a GR P U D");
		expect(result.current.slots.icon()).toBe("I CI I-i P-i D-i");

		// Rerender with same deps value: should keep memoized result (no change)
		rerender({
			m: "dark",
		});
		expect(result.current.slots.root()).toBe("I-a R I-a CR I-a GR P U D");

		// Change variant via deps: updates
		rerender({
			m: "light",
		});
		expect(result.current.slots.root()).toBe("I-a R I-a CR I-a GR P U");
	});
});
