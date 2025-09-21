import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TweakProvider, useCls } from "../../../src";

describe("react/01-core/provider-override-wins-over-internal-override", () => {
	it("provider per-slot override wins over internal per-slot override", () => {
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
			<TweakProvider
				cls={$cls}
				tweak={{
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
			</TweakProvider>
		);

		const { result } = renderHook(
			() =>
				useCls($cls, undefined, {
					override: {
						icon: {
							class: [
								"INTERNAL",
							],
						},
					},
				}),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base");
		expect(result.current.slots.icon()).toBe("PROVIDER");
	});
});
