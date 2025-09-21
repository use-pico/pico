import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { contract, TweakProvider } from "../../../src";
import { useCls } from "../../../src/react";

describe("react/01-core/user-override-wins-over-context-override", () => {
	it("applies user per-slot override over context per-slot override", () => {
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
								"CTX-OVR",
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
				useCls($cls, {
					override: {
						icon: {
							class: [
								"USER-OVR",
							],
						},
					},
				}),
			{
				wrapper,
			},
		);

		expect(result.current.slots.root()).toBe("base");
		expect(result.current.slots.icon()).toBe("USER-OVR");
	});
});
