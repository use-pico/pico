import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/order-user-provider-internal-override", () => {
	it("per-slot override precedence is user > provider > internal", () => {
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
				variant={{
					override: {
						icon: {
							class: [
								"PROVIDER",
							],
						},
					},
				}}
			>
				{children}
			</VariantProvider>
		);

		const { result } = renderHook(
			() =>
				useCls(
					$cls,
					{
						override: {
							icon: {
								class: [
									"USER",
								],
							},
						},
					},
					{
						override: {
							icon: {
								class: [
									"INTERNAL",
								],
							},
						},
					},
				),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base");
		expect(result.current.slots.icon()).toBe("USER");
	});
});
