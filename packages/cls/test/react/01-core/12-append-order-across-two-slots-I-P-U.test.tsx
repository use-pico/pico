import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/append-order-across-two-slots-I-P-U", () => {
	it("appends in order internal, then provider, then user across root and icon", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
			})
			.cls();

		const wrapper = ({ children }: PropsWithChildren) => (
			<VariantProvider
				cls={$cls}
				variant={{}}
			>
				{children}
			</VariantProvider>
		);

		const { result } = renderHook(
			() =>
				useCls($cls, [
					{
						slot: {
							root: {
								class: [
									"user-root-append",
								],
							},
							icon: {
								class: [
									"user-icon-append",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"internal-root-append",
								],
							},
							icon: {
								class: [
									"internal-icon-append",
								],
							},
						},
					},
				]),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe(
			"base user-root-append internal-root-append",
		);
		expect(result.current.slots.icon()).toBe(
			"icon-base user-icon-append internal-icon-append",
		);
	});
});
