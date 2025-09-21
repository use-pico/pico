import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TweakProvider, useCls } from "../../../src";

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
			<TweakProvider
				cls={$cls}
				tweak={{
					slot: {
						root: {
							class: [
								"PROVIDER",
							],
						},
					},
				}}
			>
				{children}
			</TweakProvider>
		);

		const { result } = renderHook(() => useCls($cls), {
			wrapper,
		});

		expect(result.current.slots.root()).toBe("base PROVIDER");
	});
});
