import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useClsMemo, VariantProvider } from "../../../src";

describe("react/01-core/use-cls-memo-order-user-provider-internal-append-and-variant", () => {
	it("applies user variant over provider over internal; appends I -> P -> U", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"button-small-size",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"button-medium-size",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const wrapper = ({ children }: PropsWithChildren) => (
			<VariantProvider
				cls={$cls}
				variant={{
					size: "md",
				}}
			>
				{children}
			</VariantProvider>
		);

		const { result } = renderHook(
			() =>
				useClsMemo(
					$cls,
					[
						{
							variant: {
								size: "sm",
							},
							slot: {
								root: {
									class: [
										"user-tweak-class",
									],
								},
							},
						},
						{
							variant: {
								size: "md",
							},
							slot: {
								root: {
									class: [
										"internal-tweak-class",
									],
								},
							},
						},
					],
					[],
				),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe(
			"base button-medium-size user-tweak-class internal-tweak-class",
		);
	});
});
