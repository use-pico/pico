import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

describe("react/01-core/provider-only-slot-append-applies", () => {
	it("applies provider slot append when user and internal are empty", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
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

		const { result } = renderHook(() => useCls($cls), {
			wrapper,
		});

		expect(result.current.slots.root()).toBe("base");
	});
});
