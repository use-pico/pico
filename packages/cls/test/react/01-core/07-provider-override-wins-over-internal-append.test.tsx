import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/provider-override-wins-over-internal-append", () => {
	it("provider per-slot override replaces internal slot append", () => {
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
					undefined,
					{
						slot: {
							icon: {
								class: [
									"INTERNAL",
								],
							},
						},
					},
				]),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base");
		expect(result.current.slots.icon()).toBe("i-base INTERNAL");
	});
});
