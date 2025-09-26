import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/order-user-provider-internal-append-and-variant", () => {
	it("applies internal slot first, then provider, then user; variant user>provider>internal", () => {
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
				useCls($cls, [
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
				]),
			{
				wrapper,
			},
		);

		// Variant: provider(md) wins over user(sm) -> MD
		// Slot appends: internal(I) then user(U) - provider no longer provides slot appends
		expect(result.current.slots.root()).toBe(
			"base button-medium-size user-tweak-class internal-tweak-class",
		);
	});
});
