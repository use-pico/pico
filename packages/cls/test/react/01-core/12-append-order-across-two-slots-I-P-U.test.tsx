import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, tweak, useCls, VariantProvider } from "../../../src";

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
						"i-base",
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
									"U-root",
								],
							},
							icon: {
								class: [
									"U-icon",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"I-root",
								],
							},
							icon: {
								class: [
									"I-icon",
								],
							},
						},
					},
				]),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base I-root U-root");
		expect(result.current.slots.icon()).toBe("i-base I-icon U-icon");
	});
});
